import { UseCase } from '@shared/application/protocols';
import { Id } from '@shared/domain/value-objects';
import { NotFoundEntityError } from '@shared/application/errors';
import { FindProductByIdInputDto, FindProductByIdOutputDto } from '@catalog/application/dtos';
import { ProductRepository } from '@catalog/application/repositories';

export class FindProductByIdUseCase implements UseCase<FindProductByIdInputDto, FindProductByIdOutputDto> {
  constructor (
    private readonly productRepository: ProductRepository
  ) {}

  async exec (data: FindProductByIdInputDto): Promise<FindProductByIdOutputDto> {
    const id = Id.create(data.productId);

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundEntityError(id.getValue());
    }

    return {
      product: product.mapperToPrimitives()
    };
  }
}
