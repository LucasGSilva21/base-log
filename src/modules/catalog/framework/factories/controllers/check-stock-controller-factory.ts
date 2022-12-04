import { CheckStockController } from '@catalog/presentation/controllers';
import { CheckStockValidation } from '@catalog/presentation/validations';
import { makeCheckStockUseCase } from '@catalog/framework/factories/usecases';

export const makeCheckStockController = (): CheckStockController => {
  const checkStockUsecase = makeCheckStockUseCase();
  const checkStockValidation = new CheckStockValidation();
  return new CheckStockController(checkStockUsecase, checkStockValidation);
};
