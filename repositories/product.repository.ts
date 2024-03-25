import products from '../data/products.json';
import { ProductEntity } from '../models/product.entity';

export async function getProducts(): Promise<ProductEntity[]> {
    return products;
}

export async function getProductById(productId: string): Promise<ProductEntity> {
    const products: ProductEntity[] = await getProducts();
    return products?.find((product: ProductEntity) => product.id === productId) as ProductEntity;
}