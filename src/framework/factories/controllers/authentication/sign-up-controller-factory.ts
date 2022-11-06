import { SignUpController } from '@presentation/controllers/authentication';
import { makeSignUpUsecase } from '@framework/factories/usecases/authentication';

export const makeSignUpController = (): SignUpController => {
  const signUpUsecase = makeSignUpUsecase();
  return new SignUpController(signUpUsecase);
};
