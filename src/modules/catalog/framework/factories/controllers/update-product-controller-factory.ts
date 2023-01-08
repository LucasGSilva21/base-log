import { UpdateProductController } from '@catalog/presentation/controllers';
import { UpdateProductValidation } from '@catalog/presentation/validations';
import { makeUpdateProductUseCase } from '@catalog/framework/factories/usecases';

export const makeUpdateProductController = (): UpdateProductController => {
  const updateProductUseCase = makeUpdateProductUseCase();
  const updateProductValidation = new UpdateProductValidation();
  return new UpdateProductController(updateProductUseCase, updateProductValidation);
};
