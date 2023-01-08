import { FindProductByIdUseCase } from '@catalog/application/usecases';
import { DynamodbProductRepository } from '@catalog/framework/database/repositories';

export const makeFindProductByIdUseCase = (): FindProductByIdUseCase => {
  const dynamodbProductRepository = new DynamodbProductRepository();
  return new FindProductByIdUseCase(dynamodbProductRepository);
};
