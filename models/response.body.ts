import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

interface ResponseBody {
    error: ResponseError | null;
}

export interface GetCartResponseBody extends ResponseBody {
    data: GetCartResponseData | null;
}

export interface GetCartResponseData {
    cart: Pick<CartEntity, "items" | "id">;
    total: number;
}

export interface GetProductsResponseBody extends ResponseBody {
    data: ProductEntity[] | null;
}

export interface GetProductResponseBody extends ResponseBody {
    data: ProductEntity | null;
}

export interface EmptyUserCartResponseData {
    success: boolean;
}

export interface EmptyUserCartResponseBody extends ResponseBody {
    data: EmptyUserCartResponseData | null;
}

export interface CheckoutCartResponseData {
    order: OrderEntity;
}

export interface CheckoutCartResponseBody extends ResponseBody {
    data: CheckoutCartResponseData | null;
}

interface ResponseError {
    message: string;
}