import { UseCase } from '@shared/application/protocols';
import { Id } from '@shared/domain/value-objects';
import { OrderStatus } from '@checkout/domain/entities';
import { UpdateOrderInputDto } from '@checkout/application/dtos';
import { OrderRepository } from '@checkout/application/repositories';
import { UnavailableStockError } from '@checkout/application/errors';
import { CatalogFacadeInterface } from '@catalog/framework/facade';
import { PaymentFacadeInterface } from '@payment/framework/facade';
import { TransactionStatus } from '@payment/domain/entities';

export class UpdateOrderUseCase implements UseCase<UpdateOrderInputDto, void> {
  constructor (
    private readonly orderRepository: OrderRepository,
    private readonly catalogFacade: CatalogFacadeInterface,
    private readonly paymentFacade: PaymentFacadeInterface
  ) {}

  async exec (data: UpdateOrderInputDto): Promise<void> {
    const orderId = Id.create(data.orderId);

    const order = await this.orderRepository.findById(orderId);

    const checkStock = await this.catalogFacade.checkStock({
      productId: order.product.id,
      amount: order.product.amount
    });

    if (!checkStock.isAvailable) {
      await this.paymentFacade.updateTransactionStatus({
        transactionId: order.transaction.id,
        status: TransactionStatus.PENDING_CHARGEBACK
      });

      order.status = OrderStatus.FAILURED;
      await this.orderRepository.update(order);

      // TODO send notification to admin

      throw new UnavailableStockError(checkStock.availableQuantity);
    }

    await this.paymentFacade.updateTransactionStatus({
      transactionId: order.transaction.id,
      status: data.transactionStatus
    });

    order.status = data.orderStatus;
    await this.orderRepository.update(order);
  }
}
