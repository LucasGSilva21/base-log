import { SignInController } from '@authentication/presentation/controllers';
import { SignInValidation } from '@authentication/presentation/validations';
import { makeSignInUsecase } from '@authentication/framework/factories/usecases';

export const makeSignInController = (): SignInController => {
  const signInUsecase = makeSignInUsecase();
  const signInValidation = new SignInValidation();
  return new SignInController(signInUsecase, signInValidation);
};
