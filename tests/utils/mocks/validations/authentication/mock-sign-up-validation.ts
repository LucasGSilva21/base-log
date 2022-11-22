import { SignUpInputDto } from '@authentication/application/dtos';
import { SignUpValidation } from '@authentication/presentation/validations';
import { Validation } from '@shared/presentation/protocols';

export const mockSignUpValidation = (): SignUpValidation => {
  class SignUpValidationStub implements Validation<SignUpInputDto> {
    async validate (): Promise<void> {
      await Promise.resolve();
    }
  }

  return new SignUpValidationStub();
};
