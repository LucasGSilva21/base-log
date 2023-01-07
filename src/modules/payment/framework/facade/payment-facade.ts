import {
  ProcessPaymentInputDto,
  ProcessPaymentOutputDto,
  UpdateTransactionStatusInputDto
} from '@payment/application/dtos';
import { ProcessPaymentController, UpdateTransactionStatusController } from '@payment/presentation/controllers';
import { PaymentFacadeInterface } from '@payment/framework/facade/payment-facade-interface';
import { OutputError } from '@shared/presentation/protocols';

export class PaymentFacade implements PaymentFacadeInterface {
  constructor (
    private readonly processPaymentController: ProcessPaymentController,
    private readonly updateTransactionStatusController: UpdateTransactionStatusController
  ) {}

  async processPayment(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto | OutputError> {
    return this.processPaymentController.handler(input);
  }

  async updateTransactionStatus(input: UpdateTransactionStatusInputDto): Promise<void | OutputError> {
    return this.updateTransactionStatusController.handler(input);
  }
}
