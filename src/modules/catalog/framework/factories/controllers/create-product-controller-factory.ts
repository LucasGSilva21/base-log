import { CreateProductController } from '@catalog/presentation/controllers';
import { CreateProductValidation } from '@catalog/presentation/validations';
import { makeCreateProductUseCase } from '@catalog/framework/factories/usecases';

export const makeCreateProductController = (): CreateProductController => {
  const createProductUsecase = makeCreateProductUseCase();
  const createProductValidation = new CreateProductValidation();
  return new CreateProductController(createProductUsecase, createProductValidation);
};
