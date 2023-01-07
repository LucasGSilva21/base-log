import { UpdateTransactionStatusUseCase } from '@payment/application/usecases';
import { DynamodbTransactionRepository } from '@payment/framework/database/repositories';

export const makeUpdateTransactionStatusUseCase = (): UpdateTransactionStatusUseCase => {
  const dynamodbTransactionRepository = new DynamodbTransactionRepository();
  return new UpdateTransactionStatusUseCase(dynamodbTransactionRepository);
};
