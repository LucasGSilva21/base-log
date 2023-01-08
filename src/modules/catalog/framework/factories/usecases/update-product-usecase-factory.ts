import { UpdateProductUseCase } from '@catalog/application/usecases';
import { DynamodbProductRepository } from '@catalog/framework/database/repositories';

export const makeUpdateProductUseCase = (): UpdateProductUseCase => {
  const dynamodbProductRepository = new DynamodbProductRepository();
  return new UpdateProductUseCase(dynamodbProductRepository);
};
