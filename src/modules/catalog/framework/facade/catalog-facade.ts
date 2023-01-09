import {
  CheckStockInputDto,
  CheckStockOutputDto,
  FindProductByIdInputDto,
  FindProductByIdOutputDto,
  UpdateProductInputDto
} from '@catalog/application/dtos';
import {
  CheckStockController,
  FindProductByIdController,
  UpdateProductController
} from '@catalog/presentation/controllers';
import { CatalogFacadeInterface } from '@catalog/framework/facade';
import { OutputError } from '@shared/presentation/protocols';

export class CatalogFacade implements CatalogFacadeInterface {
  constructor (
    private readonly checkStockController: CheckStockController,
    private readonly findProductByIdController: FindProductByIdController,
    private readonly updateProductController: UpdateProductController
  ) {}

  async checkStock(input: CheckStockInputDto): Promise <CheckStockOutputDto | OutputError> {
    return this.checkStockController.handler(input);
  }

  async findProductById(input: FindProductByIdInputDto): Promise<FindProductByIdOutputDto | OutputError> {
    return this.findProductByIdController.handler(input);
  }

  async updateProduct(input: UpdateProductInputDto): Promise<void | OutputError> {
    return this.updateProductController.handler(input);
  }
}
