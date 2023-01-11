import { OrderEntity } from '@checkout/domain/entities';

export interface OrderRepository {
  create (data: OrderEntity): Promise<OrderEntity>
  update (data: OrderEntity): Promise<void>
}
