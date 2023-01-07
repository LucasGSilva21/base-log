import { TransactionStatus } from '@payment/domain/entities';

export interface UpdateTransactionStatusInputDto {
  transactionId: string
  status: TransactionStatus
}
