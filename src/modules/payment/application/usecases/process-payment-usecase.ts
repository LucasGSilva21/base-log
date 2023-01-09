import { UseCase } from '@shared/application/protocols';
import { Id, TotalInCents } from '@shared/domain/value-objects';
import { TransactionEntity, TransactionStatus } from '@payment/domain/entities';
import { TransactionRepository } from '@payment/application/repositories';
import { PaymentGatewayService } from '@payment/application/services';
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from '@payment/application/dtos';

export class ProcessPaymentUseCase implements UseCase<ProcessPaymentInputDto, ProcessPaymentOutputDto> {
  constructor (
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGatewayService: PaymentGatewayService
  ) {}

  async exec (data: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const orderId = Id.create(data.orderId);
    const totalInCents = TotalInCents.create(data.totalInCents);

    const transaction = TransactionEntity.create({
      orderId,
      totalInCents,
      status: TransactionStatus.PENDING
    });

    await this.transactionRepository.create(transaction);

    const { paymentLink } = await this.paymentGatewayService.processPayment({
      totalInCents: transaction.totalInCents.getValue(),
      orderId: transaction.orderId.getValue(),
      transactionId: transaction.id.getValue()
    });

    return {
      paymentLink,
      transaction: transaction.mapperToPrimitives()
    };
  }
}
