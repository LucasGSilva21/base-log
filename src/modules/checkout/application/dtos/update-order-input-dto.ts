import { OrderStatus } from '@checkout/domain/entities';
import { TransactionStatus } from '@payment/domain/entities';

export interface UpdateOrderInputDto {
  orderId: string
  orderStatus: OrderStatus
  transactionStatus: TransactionStatus
}
