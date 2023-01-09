import { TransactionPrimitivesProps } from '@payment/domain/entities';

export interface ProcessPaymentOutputDto {
  paymentLink: string
  transaction: TransactionPrimitivesProps
}
