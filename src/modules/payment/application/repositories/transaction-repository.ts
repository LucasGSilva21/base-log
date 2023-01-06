import { TransactionEntity } from '@payment/domain/entities';

export interface TransactionRepository {
  create (data: TransactionEntity): Promise<TransactionEntity>
}
