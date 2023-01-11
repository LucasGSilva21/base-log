import {
  ProcessPaymentInputDto,
  ProcessPaymentOutputDto,
  UpdateTransactionStatusInputDto
} from '@payment/application/dtos';

export interface PaymentFacadeInterface {
  processPayment(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto>
  updateTransactionStatus(input: UpdateTransactionStatusInputDto): Promise<void>
}
