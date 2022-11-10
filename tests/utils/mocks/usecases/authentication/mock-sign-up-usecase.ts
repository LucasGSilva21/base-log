import { UseCase } from '@application/protocols';
import { SignUpInputDto, SignUpOutputDto } from '@application/dtos/authentication';
import { mockCreateAccount } from '@tests/utils/mocks/entities';

export const mockSignUpUseCase = (): UseCase<SignUpInputDto, SignUpOutputDto> => {
  class SignUpUseCaseStub implements UseCase<SignUpInputDto, SignUpOutputDto> {
    async exec (): Promise<SignUpOutputDto> {
      const account = mockCreateAccount();
      return account.mapperToPrimitives();
    }
  }

  return new SignUpUseCaseStub();
};
