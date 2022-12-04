import { CheckStockUseCase } from '@catalog/application/usecases';
import { DynamodbProductRepository } from '@catalog/framework/database/repositories';

export const makeCheckStockUseCase = (): CheckStockUseCase => {
  const dynamodbProductRepository = new DynamodbProductRepository();
  return new CheckStockUseCase(dynamodbProductRepository);
};
