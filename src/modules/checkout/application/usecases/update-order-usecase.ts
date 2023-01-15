import { UseCase } from '@shared/application/protocols';
import { Id } from '@shared/domain/value-objects';
import { OrderEntity, OrderStatus } from '@checkout/domain/entities';
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

    // TODO not found order

    const checkStock = await this.catalogFacade.checkStock({
      productId: order.product.id,
      amount: order.product.amount
    });

    if (!checkStock.isAvailable) {
      await this.paymentFacade.updateTransactionStatus({
        transactionId: order.transaction.id,
        status: TransactionStatus.PENDING_CHARGEBACK
      });

      const orderUpdated = OrderEntity.create({
        id: order.id,
        totalInCents: order.totalInCents,
        status: OrderStatus.FAILURED,
        product: {
          id: order.product.id,
          productName: order.product.productName,
          priceInCents: order.product.priceInCents,
          amount: order.product.amount,
          isActive: order.product.isActive
        },
        amount: order.amount,
        transaction: {
          id: order.transaction.id,
          orderId: order.id.getValue(),
          totalInCents: order.transaction.totalInCents,
          status: TransactionStatus.PENDING_CHARGEBACK
        }
      });

      await this.orderRepository.update(orderUpdated);

      // TODO send notification to admin

      throw new UnavailableStockError(checkStock.availableQuantity);
    }

    // TODO remove amount product

    await this.paymentFacade.updateTransactionStatus({
      transactionId: order.transaction.id,
      status: data.transactionStatus
    });

    const orderUpdated = OrderEntity.create({
      id: order.id,
      totalInCents: order.totalInCents,
      status: data.orderStatus,
      product: {
        id: order.product.id,
        productName: order.product.productName,
        priceInCents: order.product.priceInCents,
        amount: order.product.amount,
        isActive: order.product.isActive
      },
      amount: order.amount,
      transaction: {
        id: order.transaction.id,
        orderId: order.id.getValue(),
        totalInCents: order.transaction.totalInCents,
        status: data.transactionStatus
      }
    });

    await this.orderRepository.update(orderUpdated);
  }
}
