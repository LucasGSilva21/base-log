import { UpdateOrderUseCase } from '@checkout/application/usecases';
import { DynamodbOrderRepository } from '@checkout/framework/database/repositories';
import { makeCatalogFacade } from '@catalog/framework/factories/facade';
import { makePaymentFacade } from '@payment/framework/factories/facade';

export const makeUpdateOrderUseCase = (): UpdateOrderUseCase => {
  const dynamodbOrderRepository = new DynamodbOrderRepository();
  const catalogFacade = makeCatalogFacade();
  const paymentFacade = makePaymentFacade();
  return new UpdateOrderUseCase(dynamodbOrderRepository, catalogFacade, paymentFacade);
};
