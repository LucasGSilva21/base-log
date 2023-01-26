import { PlaceOrderUseCase } from '@checkout/application/usecases';
import { DynamodbOrderRepository } from '@checkout/framework/database/repositories';
import { makeCatalogFacade } from '@catalog/framework/factories/facade';
import { makePaymentFacade } from '@payment/framework/factories/facade';
import { makeNotificationFacade } from '@notification/framework/factories/facade';

export const makePlaceOrderUseCase = (): PlaceOrderUseCase => {
  const dynamodbOrderRepository = new DynamodbOrderRepository();
  const catalogFacade = makeCatalogFacade();
  const paymentFacade = makePaymentFacade();
  const notificationFacade = makeNotificationFacade();
  return new PlaceOrderUseCase(dynamodbOrderRepository, catalogFacade, paymentFacade, notificationFacade);
};
