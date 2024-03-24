import path from 'path';
import carts from '../data/carts.json';
import { CartEntity } from '../models/cart.entity';
import { ErrorMessage } from '../models/errors';
import { updateFileData } from './shared/write-data-to-file';

const dataFilePath: string = path.join(__dirname, '../data', 'carts.json');

export async function getCarts(): Promise<CartEntity[]> {
    return carts as CartEntity[];
}
export async function getCartByUserId(userId: string): Promise<CartEntity> {
    const cartsList: CartEntity[] = await getCarts();

    return cartsList.find((cart: CartEntity) => cart.userId === userId) as CartEntity;
}

export async function createCart(cart: CartEntity): Promise<CartEntity> {
    const cartsList: CartEntity[] = await getCarts();
    (cartsList as any)?.push(cart) as CartEntity[];

    await updateFileData<CartEntity[]>(dataFilePath, cartsList);

    return cart;
}

export async function updateCarts(carts: CartEntity[]): Promise<CartEntity[]> {
    await updateFileData<CartEntity[]>(dataFilePath, carts);

    return carts;
}

export async function emptyUserCartByUserId(userId: string): Promise<boolean> {
    const cartsList: CartEntity[] = await getCarts();
    const removedCart: CartEntity = cartsList.find((cart: CartEntity) => cart.userId === userId) as CartEntity;

    if (!removedCart) {
        throw new Error(ErrorMessage.NotFoundCart);
    }

    removedCart.items = [];

    await updateFileData<CartEntity[]>(dataFilePath, cartsList);

    return true;
}
