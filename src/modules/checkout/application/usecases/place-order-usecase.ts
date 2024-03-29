import { UseCase } from '@shared/application/protocols';
import { TotalInCents, Amount } from '@shared/domain/value-objects';
import { OrderEntity, OrderStatus } from '@checkout/domain/entities';
import { PlaceOrderInputDto, PlaceOrderOutputDto } from '@checkout/application/dtos';
import { UnavailableStockError } from '@checkout/application/errors';
import { OrderRepository } from '@checkout/application/repositories';
import { CatalogFacadeInterface } from '@catalog/framework/facade';
import { PaymentFacadeInterface } from '@payment/framework/facade';
import { NotificationFacadeInterface } from '@notification/framework/facade';

export class PlaceOrderUseCase implements UseCase<PlaceOrderInputDto, PlaceOrderOutputDto> {
  constructor (
    private readonly orderRepository: OrderRepository,
    private readonly catalogFacade: CatalogFacadeInterface,
    private readonly paymentFacade: PaymentFacadeInterface,
    private readonly notificationFacade: NotificationFacadeInterface
  ) {}

  async exec (data: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const productId = data.productId;
    const amount = Amount.create(data.amount);

    const checkStock = await this.catalogFacade.checkStock({
      productId,
      amount: amount.getValue()
    });

    if (!checkStock.isAvailable) {
      await this.notificationFacade.notifyUnavailableStock({
        productId,
        amount: amount.getValue(),
        availableQuantity: checkStock.availableQuantity
      });

      throw new UnavailableStockError(checkStock.availableQuantity);
    }

    const { product } = await this.catalogFacade.findProductById({ productId });

    const totalInCents = TotalInCents.create(product.priceInCents * data.amount);

    const order = OrderEntity.create({
      totalInCents,
      status: OrderStatus.PENDING,
      product: {
        id: product.id,
        productName: product.productName,
        priceInCents: product.priceInCents,
        amount: product.amount,
        isActive: product.isActive
      },
      amount,
      account: {
        id: data.accountId
      }
    });

    const orderCreated = await this.orderRepository.create(order);

    const { paymentLink, transaction } = await this.paymentFacade.processPayment({
      orderId: orderCreated.id.getValue(),
      totalInCents: orderCreated.totalInCents.getValue()
    });

    const orderUpdated = OrderEntity.create({
      id: orderCreated.id,
      totalInCents,
      status: OrderStatus.PENDING,
      product: {
        id: product.id,
        productName: product.productName,
        priceInCents: product.priceInCents,
        amount: product.amount,
        isActive: product.isActive
      },
      amount,
      transaction: {
        id: transaction.id,
        orderId: orderCreated.id.getValue(),
        totalInCents: transaction.totalInCents,
        status: transaction.status
      },
      account: {
        id: orderCreated.account.id
      }
    });

    await this.orderRepository.update(orderUpdated);

    return {
      order: orderUpdated.mapperToPrimitives(),
      paymentLink
    };
  }
}
