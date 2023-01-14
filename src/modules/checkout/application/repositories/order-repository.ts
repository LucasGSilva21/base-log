import { Id } from '@shared/domain/value-objects';
import { OrderEntity } from '@checkout/domain/entities';

export interface OrderRepository {
  findById (id: Id): Promise<OrderEntity>
  create (data: OrderEntity): Promise<OrderEntity>
  update (data: OrderEntity): Promise<void>
}
