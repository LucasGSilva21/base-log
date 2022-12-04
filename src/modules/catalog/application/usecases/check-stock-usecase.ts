import { UseCase } from '@shared/application/protocols';
import { Id } from '@shared/domain/value-objects';
import { NotFoundEntityError } from '@shared/application/errors';
import { CheckStockInputDto, CheckStockOutputDto } from '@catalog/application/dtos';
import { ProductRepository } from '@catalog/application/repositories';

export class CheckStockUseCase implements UseCase<CheckStockInputDto, CheckStockOutputDto> {
  constructor (
    private readonly productRepository: ProductRepository
  ) {}

  async exec (data: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const id = Id.create(data.productId);

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundEntityError(id.getValue());
    }

    if (data.amount > product.amount.getValue()) {
      return {
        isAvailable: false,
        availableQuantity: product.amount.getValue()
      };
    }

    return {
      isAvailable: true,
      availableQuantity: product.amount.getValue()
    };
  }
}
