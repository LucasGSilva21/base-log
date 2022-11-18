import { UseCase } from '@shared/application/protocols';
import { SignUpInputDto, SignUpOutputDto } from '@authentication/application/dtos';
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
