import path from 'path';
import orders from '../data/orders.json';
import { OrderEntity } from '../models/order.entity';
import { updateFileData } from './shared/write-data-to-file';

async function getOrders(): Promise<OrderEntity[]> {
    return orders as OrderEntity[];
}

export async function getPreviousOrder(userId: string): Promise<OrderEntity | undefined> {
    const orders: OrderEntity[] = await getOrders();

    return orders.findLast((order: OrderEntity) => order.userId === userId);
}

export async function createNewOrder(order: OrderEntity): Promise<OrderEntity> {
    const orders: OrderEntity[] = await getOrders();
    (orders as any)?.push(order) as OrderEntity[];
    const dataFilePath: string = path.join(__dirname, '../data', 'orders.json');

    await updateFileData<OrderEntity[]>(dataFilePath, orders);

    return order;
}