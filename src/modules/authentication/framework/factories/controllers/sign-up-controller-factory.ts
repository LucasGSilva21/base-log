import { SignUpController } from '@authentication/presentation/controllers';
import { SignUpValidation } from '@authentication/presentation/validations';
import { makeSignUpUsecase } from '@authentication/framework/factories/usecases';

export const makeSignUpController = (): SignUpController => {
  const signUpUsecase = makeSignUpUsecase();
  const signUpValidation = new SignUpValidation();
  return new SignUpController(signUpUsecase, signUpValidation);
};
