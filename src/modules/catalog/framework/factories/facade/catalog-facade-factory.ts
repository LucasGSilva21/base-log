import { CatalogFacade } from '@catalog/framework/facade';
import {
  makeCheckStockController,
  makeFindProductByIdController,
  makeUpdateProductController
} from '@catalog/framework/factories/controllers';

export const makeCatalogFacade = (): CatalogFacade => {
  const checkStockController = makeCheckStockController();
  const findProductByIdController = makeFindProductByIdController();
  const updateProductController = makeUpdateProductController();
  return new CatalogFacade(
    checkStockController,
    findProductByIdController,
    updateProductController
  );
};
