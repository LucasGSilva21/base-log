import { FindProductByIdController } from '@catalog/presentation/controllers';
import { FindProductByIdValidation } from '@catalog/presentation/validations';
import { makeFindProductByIdUseCase } from '@catalog/framework/factories/usecases';

export const makeFindProductByIdController = (): FindProductByIdController => {
  const findProductByIdUseCase = makeFindProductByIdUseCase();
  const findProductByIdValidation = new FindProductByIdValidation();
  return new FindProductByIdController(findProductByIdUseCase, findProductByIdValidation);
};
