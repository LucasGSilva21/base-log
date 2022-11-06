import { SignUpUseCase } from '@application/usecases/authentication';
import { DynamodbAccountRepository } from '@framework/database/repositories';

export const makeSignUpUsecase = (): SignUpUseCase => {
  const dynamodbAccountRepository = new DynamodbAccountRepository();
  return new SignUpUseCase(dynamodbAccountRepository);
};
