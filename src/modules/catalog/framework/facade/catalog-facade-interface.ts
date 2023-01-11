import {
  CheckStockInputDto,
  CheckStockOutputDto,
  FindProductByIdInputDto,
  FindProductByIdOutputDto,
  UpdateProductInputDto
} from '@catalog/application/dtos';

export interface CatalogFacadeInterface {
  checkStock(input: CheckStockInputDto): Promise <CheckStockOutputDto>
  findProductById(input: FindProductByIdInputDto): Promise<FindProductByIdOutputDto>
  updateProduct(input: UpdateProductInputDto): Promise<void>
}
