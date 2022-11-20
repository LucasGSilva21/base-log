import { SignInUseCase } from '@authentication/application/usecases';
import { DynamodbAccountRepository } from '@authentication/framework/database/repositories';

export const makeSignInUsecase = (): SignInUseCase => {
  const dynamodbAccountRepository = new DynamodbAccountRepository();
  return new SignInUseCase(dynamodbAccountRepository);
};
