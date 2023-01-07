import { Id } from '@shared/domain/value-objects';
import { TransactionEntity } from '@payment/domain/entities';

export interface TransactionRepository {
  findById (id: Id): Promise<TransactionEntity>
  create (data: TransactionEntity): Promise<TransactionEntity>
  update (data: TransactionEntity): Promise<void>
}
