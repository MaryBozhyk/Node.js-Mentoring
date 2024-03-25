import { ProductEntity } from '../models/product.entity';
import { getProductById, getProducts } from '../repositories/product.repository';

export async function getProductsData(): Promise<ProductEntity[]> {
    return await getProducts();
};

export async function getProductData(productId: string): Promise<ProductEntity> {
    return await getProductById(productId);
};