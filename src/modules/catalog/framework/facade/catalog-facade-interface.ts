import {
  CheckStockInputDto,
  CheckStockOutputDto,
  FindProductByIdInputDto,
  FindProductByIdOutputDto,
  UpdateProductInputDto
} from '@catalog/application/dtos';
import { OutputError } from '@shared/presentation/protocols';

export interface CatalogFacadeInterface {
  checkStock(input: CheckStockInputDto): Promise <CheckStockOutputDto | OutputError>
  findProductById(input: FindProductByIdInputDto): Promise<FindProductByIdOutputDto | OutputError>
  updateProduct(input: UpdateProductInputDto): Promise<void | OutputError>
}
