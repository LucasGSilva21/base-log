import { PaymentFacade } from '@payment/framework/facade';
import { makeProcessPaymentController, makeUpdateTransactionStatusController } from '@payment/framework/factories/controllers';

export const makePaymentFacade = (): PaymentFacade => {
  const processPaymentController = makeProcessPaymentController();
  const updateTransactionStatusController = makeUpdateTransactionStatusController();
  return new PaymentFacade(processPaymentController, updateTransactionStatusController);
};
