import { NotifyPaymentStatusController } from '@notification/presentation/controllers';
import { NotifyPaymentStatusValidation } from '@notification/presentation/validations';
import { makeNotifyPaymentStatusUseCase } from '@notification/framework/factories/usecases';

export const makeNotifyPaymentStatusController = (): NotifyPaymentStatusController => {
  const notifyPaymentStatusUseCase = makeNotifyPaymentStatusUseCase();
  const notifyPaymentStatusValidation = new NotifyPaymentStatusValidation();
  return new NotifyPaymentStatusController(notifyPaymentStatusUseCase, notifyPaymentStatusValidation);
};
