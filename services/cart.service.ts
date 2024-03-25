import { v4 as uuid } from 'uuid';
import { CartEntity, CartItemEntity } from '../models/cart.entity';
import { OrderEntity } from '../models/order.entity';
import { ProductEntity } from '../models/product.entity';
import { UpdateCartRequestBody } from '../models/request.body';
import { CheckoutCartResponseData, EmptyUserCartResponseData, GetCartResponseData } from '../models/response.body';
import { createCart, emptyUserCartByUserId, getCartByUserId, getCarts, updateCarts } from '../repositories/cart.repository';
import { createNewOrder, getPreviousOrder } from '../repositories/order.repository';
import { getProductById } from '../repositories/product.repository';

export async function getCartData(userId: string): Promise<GetCartResponseData | null> {
    let cart: CartEntity = await getCartByUserId(userId);

    if (!cart) {
        cart = await createNewCart(userId);
    }

    return getCartResponseData(cart);
}

export async function updateCart(userId: string, updatedProduct: UpdateCartRequestBody): Promise<GetCartResponseData | null | undefined> {
    const cartsList: CartEntity[] = await getCarts();
    const cart: CartEntity = cartsList.find((cart: CartEntity) => cart.userId === userId) as CartEntity;

    if (cart) {
        const productToUpdate: CartItemEntity | undefined = cart.items?.find((item: CartItemEntity) => item.product.id === updatedProduct.productId);

        if (productToUpdate) {
            productToUpdate.count = updatedProduct.count;
        } else {
            const product: ProductEntity = await getProductById(updatedProduct.productId);

            if (!product) {
                return undefined;
            }

            cart.items.push({
                product,
                count: updatedProduct.count
            });
        }

        await updateCarts(cartsList);
    }

    return getCartResponseData(cart);
};

export async function emptyUserCart(userId: string): Promise<EmptyUserCartResponseData | null> {
    await emptyUserCartByUserId(userId);

    return {
        success: true
    };
}

export async function checkoutCart(userId: string): Promise<CheckoutCartResponseData | null> {
    const cart: CartEntity = await getCartByUserId(userId);

    if (!cart || cart.items.length === 0) {
        return null;
    }

    const previousOrder: OrderEntity | undefined = await getPreviousOrder(userId);
    const order: OrderEntity = createOrderFromCart(cart, previousOrder);
    const publishedOrder: OrderEntity = await createNewOrder(order);

    await emptyUserCartByUserId(userId);

    return {
        order: publishedOrder
    };
}

async function createNewCart(userId: string): Promise<CartEntity> {
    const cart: CartEntity = {
        id: uuid(),
        userId,
        isDeleted: false,
        items: []
    };

    await createCart(cart);

    return cart;
}

function getCartResponseData(cart: CartEntity): GetCartResponseData | null {
    const total: number = getTotalPrice(cart?.items);
    const response: GetCartResponseData | null = cart ? {
        cart: {
            id: cart?.id,
            items: cart?.items
        },
        total
    } : null;

    return response;
};

function createOrderFromCart(cart: CartEntity, previousOrder: OrderEntity | undefined): OrderEntity {
    return {
        id: uuid(),
        userId: cart.userId,
        cartId: cart.id,
        items: cart.items,
        payment: {
            type: previousOrder?.payment.type ?? 'paypal',
            address: previousOrder?.payment?.address,
            creditCard: previousOrder?.payment?.creditCard
        },
        delivery: {
            type: previousOrder?.delivery?.type ?? '',
            address: previousOrder?.delivery?.address ?? ''
        },
        comments: '',
        status: 'created',
        total: getTotalPrice(cart.items)
    };
}

function getTotalPrice(items: CartItemEntity[]): number {
    return items ? items.reduce((sum: number, item: CartItemEntity) => sum + item.product.price * item.count, 0) : 0;
}