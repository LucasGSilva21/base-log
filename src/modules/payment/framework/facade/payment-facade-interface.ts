import {
  ProcessPaymentInputDto,
  ProcessPaymentOutputDto,
  UpdateTransactionStatusInputDto
} from '@payment/application/dtos';
import { OutputError } from '@shared/presentation/protocols';

export interface PaymentFacadeInterface {
  processPayment(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto | OutputError>
  updateTransactionStatus(input: UpdateTransactionStatusInputDto): Promise<void | OutputError>
}
