import { NotifyUnavailableStockController } from '@notification/presentation/controllers';
import { NotifyUnavailableStockValidation } from '@notification/presentation/validations';
import { makeNotifyUnavailableStockUseCase } from '@notification/framework/factories/usecases';

export const makeNotifyUnavailableStockController = (): NotifyUnavailableStockController => {
  const notifyUnavailableStockUseCase = makeNotifyUnavailableStockUseCase();
  const notifyUnavailableStockValidation = new NotifyUnavailableStockValidation();
  return new NotifyUnavailableStockController(notifyUnavailableStockUseCase, notifyUnavailableStockValidation);
};
