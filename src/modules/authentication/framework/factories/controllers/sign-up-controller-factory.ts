import { SignUpController } from '@authentication/presentation/controllers';
import { makeSignUpUsecase } from '@authentication/framework/factories/usecases';

export const makeSignUpController = (): SignUpController => {
  const signUpUsecase = makeSignUpUsecase();
  return new SignUpController(signUpUsecase);
};
