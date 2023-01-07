import { ProcessPaymentController } from '@payment/presentation/controllers';
import { ProcessPaymentValidation } from '@payment/presentation/validations';
import { makeProcessPaymentUseCase } from '@payment/framework/factories/usecases';

export const makeProcessPaymentController = (): ProcessPaymentController => {
  const processPaymentUseCase = makeProcessPaymentUseCase();
  const processPaymentValidation = new ProcessPaymentValidation();
  return new ProcessPaymentController(processPaymentUseCase, processPaymentValidation);
};
