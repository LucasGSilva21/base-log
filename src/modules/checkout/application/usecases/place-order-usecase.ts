import { UseCase } from '@shared/application/protocols';
import { TotalInCents, Amount } from '@shared/domain/value-objects';
import { OrderEntity, OrderStatus } from '@checkout/domain/entities';
import { PlaceOrderInputDto, PlaceOrderOutputDto } from '@checkout/application/dtos';
import { OrderRepository } from '@checkout/application/repositories';
import { CatalogFacadeInterface } from '@catalog/framework/facade';
import { PaymentFacadeInterface } from '@payment/framework/facade';

export class PlaceOrderUseCase implements UseCase<PlaceOrderInputDto, PlaceOrderOutputDto> {
  constructor (
    private readonly orderRepository: OrderRepository,
    private readonly catalogFacade: CatalogFacadeInterface,
    private readonly paymentFacade: PaymentFacadeInterface
  ) {}

  async exec (data: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const productId = data.productId;
    const totalInCents = TotalInCents.create(data.totalInCents);
    const amount = Amount.create(data.amount);

    const { product } = await this.catalogFacade.findProductById({ productId });

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
