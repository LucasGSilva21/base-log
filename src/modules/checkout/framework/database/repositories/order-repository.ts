import { Id, TotalInCents, Amount } from '@shared/domain/value-objects';
import { OrderEntity } from '@checkout/domain/entities';
import { OrderRepository } from '@checkout/application/repositories';
import { OrderModel } from '@checkout/framework/database/models';

export class DynamodbOrderRepository implements OrderRepository {
  async create (data: OrderEntity): Promise<OrderEntity> {
    const transaction = await OrderModel.create({
      id: data.id.getValue(),
      totalInCents: data.totalInCents.getValue(),
      status: data.status,
      amount: data.amount.getValue(),
      product: data.product,
      transaction: data.transaction
    });

    return OrderEntity.create({
      id: Id.create(transaction.id),
      totalInCents: TotalInCents.create(transaction.totalInCents),
      status: transaction.status,
      amount: Amount.create(transaction.amount),
      product: data.product,
      transaction: data.transaction,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    });
  }

  async update (data: OrderEntity): Promise<void> {
    await OrderModel.update({
      id: data.id.getValue(),
      totalInCents: data.totalInCents.getValue(),
      status: data.status,
      amount: data.amount.getValue(),
      product: data.product,
      transaction: data.transaction
    });
  }
}
