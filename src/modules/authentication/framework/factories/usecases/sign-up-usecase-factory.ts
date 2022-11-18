import { SignUpUseCase } from '@authentication/application/usecases';
import { DynamodbAccountRepository } from '@authentication/framework/database/repositories';

export const makeSignUpUsecase = (): SignUpUseCase => {
  const dynamodbAccountRepository = new DynamodbAccountRepository();
  return new SignUpUseCase(dynamodbAccountRepository);
};
