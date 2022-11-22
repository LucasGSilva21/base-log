import { UseCase } from '@shared/application/protocols';
import { SignInInputDto, SignInOutputDto } from '@authentication/application/dtos';

export const mockSignInUseCase = (): UseCase<SignInInputDto, SignInOutputDto> => {
  class SignInUseCaseStub implements UseCase<SignInInputDto, SignInOutputDto> {
    async exec (): Promise<SignInOutputDto> {
      return { accessToken: 'valid-token' };
    }
  }

  return new SignInUseCaseStub();
};
