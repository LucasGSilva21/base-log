import { SignInInputDto } from '@authentication/application/dtos';
import { SignInValidation } from '@authentication/presentation/validations';
import { Validation } from '@shared/presentation/protocols';

export const mockSignInValidation = (): SignInValidation => {
  class SignInValidationStub implements Validation<SignInInputDto> {
    async validate (): Promise<void> {
      await Promise.resolve();
    }
  }

  return new SignInValidationStub();
};
