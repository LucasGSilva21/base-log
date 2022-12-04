import { UseCase } from '@shared/application/protocols';
import { ListProductsOutputDto } from '@catalog/application/dtos';
import { ProductRepository } from '@catalog/application/repositories';

export class ListProductsUseCase implements UseCase<undefined, ListProductsOutputDto> {
  constructor (
    private readonly productRepository: ProductRepository
  ) {}

  async exec (): Promise<ListProductsOutputDto> {
    const products = await this.productRepository.list();

    return {
      products: products.map(product => product.mapperToPrimitives())
    };
  }
}
