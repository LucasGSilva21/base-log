import { Id, TotalInCents } from '@shared/domain/value-objects';
import { TransactionEntity } from '@payment/domain/entities';
import { TransactionRepository } from '@payment/application/repositories';
import { TransactionModel } from '@payment/framework/database/models';

export class DynamodbTransactionRepository implements TransactionRepository {
  async findById (id: Id): Promise<TransactionEntity> {
    const transaction = await TransactionModel.query('id').eq(id.getValue()).exec();

    if (transaction) {
      return TransactionEntity.create({
        id: Id.create(transaction[0].id),
        orderId: Id.create(transaction[0].orderId),
        totalInCents: TotalInCents.create(transaction[0].totalInCents),
        status: transaction[0].status,
        createdAt: transaction[0].createdAt,
        updatedAt: transaction[0].updatedAt
      });
    }

    return null;
  }

  async create (data: TransactionEntity): Promise<TransactionEntity> {
    const transaction = await TransactionModel.create({
      id: data.id.getValue(),
      orderId: data.orderId.getValue(),
      totalInCents: data.totalInCents.getValue(),
      status: data.status
    });

    return TransactionEntity.create({
      id: Id.create(transaction.id),
      orderId: Id.create(transaction.orderId),
      totalInCents: TotalInCents.create(transaction.totalInCents),
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    });
  }

  async update (data: TransactionEntity): Promise<void> {
    await TransactionModel.update({
      id: data.id.getValue(),
      orderId: data.orderId.getValue(),
      totalInCents: data.totalInCents.getValue(),
      status: data.status
    });
  }
}
