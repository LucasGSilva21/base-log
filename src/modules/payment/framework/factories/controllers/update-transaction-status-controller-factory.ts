import { UpdateTransactionStatusController } from '@payment/presentation/controllers';
import { UpdateTransactionStatusValidation } from '@payment/presentation/validations';
import { makeUpdateTransactionStatusUseCase } from '@payment/framework/factories/usecases';

export const makeUpdateTransactionStatusController = (): UpdateTransactionStatusController => {
  const updateTransactionStatusUseCase = makeUpdateTransactionStatusUseCase();
  const updateTransactionStatusValidation = new UpdateTransactionStatusValidation();
  return new UpdateTransactionStatusController(updateTransactionStatusUseCase, updateTransactionStatusValidation);
};
