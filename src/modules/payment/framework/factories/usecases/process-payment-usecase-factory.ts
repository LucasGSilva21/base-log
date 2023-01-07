import { ProcessPaymentUseCase } from '@payment/application/usecases';
import { DynamodbTransactionRepository } from '@payment/framework/database/repositories';
import { ExamplePaymentGatewayService } from '@payment/framework/services';

export const makeProcessPaymentUseCase = (): ProcessPaymentUseCase => {
  const dynamodbTransactionRepository = new DynamodbTransactionRepository();
  const examplePaymentGatewayService = new ExamplePaymentGatewayService();
  return new ProcessPaymentUseCase(dynamodbTransactionRepository, examplePaymentGatewayService);
};
