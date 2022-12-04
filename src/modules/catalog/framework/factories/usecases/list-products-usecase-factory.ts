import { ListProductsUseCase } from '@catalog/application/usecases';
import { DynamodbProductRepository } from '@catalog/framework/database/repositories';

export const makeListProductsUseCase = (): ListProductsUseCase => {
  const dynamodbProductRepository = new DynamodbProductRepository();
  return new ListProductsUseCase(dynamodbProductRepository);
};
