import { CreateProductUseCase } from '@catalog/application/usecases';
import { DynamodbProductRepository } from '@catalog/framework/database/repositories';

export const makeCreateProductUseCase = (): CreateProductUseCase => {
  const dynamodbProductRepository = new DynamodbProductRepository();
  return new CreateProductUseCase(dynamodbProductRepository);
};
