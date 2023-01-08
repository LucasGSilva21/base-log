import { CatalogFacade } from '@catalog/framework/facade';
import { makeFindProductByIdController, makeUpdateProductController } from '@catalog/framework/factories/controllers';

export const makeCatalogFacade = (): CatalogFacade => {
  const findProductByIdController = makeFindProductByIdController();
  const updateProductController = makeUpdateProductController();
  return new CatalogFacade(findProductByIdController, updateProductController);
};
