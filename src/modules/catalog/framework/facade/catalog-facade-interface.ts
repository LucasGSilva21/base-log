import {
  FindProductByIdInputDto,
  FindProductByIdOutputDto,
  UpdateProductInputDto
} from '@catalog/application/dtos';
import { OutputError } from '@shared/presentation/protocols';

export interface CatalogFacadeInterface {
  findProductById(input: FindProductByIdInputDto): Promise<FindProductByIdOutputDto | OutputError>
  updateProduct(input: UpdateProductInputDto): Promise<void | OutputError>
}
