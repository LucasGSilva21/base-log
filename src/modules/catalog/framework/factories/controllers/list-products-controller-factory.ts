import { ListProductsController } from '@catalog/presentation/controllers';
import { makeListProductsUseCase } from '@catalog/framework/factories/usecases';

export const makeListProductsController = (): ListProductsController => {
  const listProductsUsecase = makeListProductsUseCase();
  return new ListProductsController(listProductsUsecase);
};
