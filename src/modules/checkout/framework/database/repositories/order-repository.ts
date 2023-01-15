import { Id, TotalInCents, Amount } from '@shared/domain/value-objects';
import { OrderEntity } from '@checkout/domain/entities';
import { OrderRepository } from '@checkout/application/repositories';
import { OrderModel } from '@checkout/framework/database/models';

export class DynamodbOrderRepository implements OrderRepository {
  async findById (id: Id): Promise<OrderEntity> {
    const order = await OrderModel.query('id').eq(id.getValue()).exec();

    if (order) {
      return OrderEntity.create({
        id: Id.create(order[0].id),
        totalInCents: TotalInCents.create(order[0].totalInCents),
        status: order[0].status,
        amount: Amount.create(order[0].amount),
        product: order[0].product,
        transaction: order[0].transaction,
        createdAt: order[0].createdAt,
        updatedAt: order[0].updatedAt
      });
    }

    return null;
  }

  async create (data: OrderEntity): Promise<OrderEntity> {
    const order = await OrderModel.create({
      id: data.id.getValue(),
      totalInCents: data.totalInCents.getValue(),
      status: data.status,
      amount: data.amount.getValue(),
      product: data.product,
      transaction: data.transaction
    });

    return OrderEntity.create({
      id: Id.create(order.id),
      totalInCents: TotalInCents.create(order.totalInCents),
      status: order.status,
      amount: Amount.create(order.amount),
      product: data.product,
      transaction: data.transaction,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
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
