import { UseCase } from '@shared/application/protocols';
import { Id, Amount } from '@shared/domain/value-objects';
import { NotFoundEntityError } from '@shared/application/errors';
import { ProductEntity } from '@catalog/domain/entities';
import { ProductName, PriceInCents } from '@catalog/domain/value-objects';
import { UpdateProductInputDto } from '@catalog/application/dtos';
import { ProductRepository } from '@catalog/application/repositories';

export class UpdateProductUseCase implements UseCase<UpdateProductInputDto, void> {
  constructor (
    private readonly productRepository: ProductRepository
  ) {}

  async exec (data: UpdateProductInputDto): Promise<void> {
    const productId = Id.create(data.productId);

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundEntityError(productId.getValue());
    }

    const updateProduct = ProductEntity.create({
      id: productId,
      productName: data.productName ? ProductName.create(data.productName) : product.productName,
      priceInCents: data.priceInCents ? PriceInCents.create(data.priceInCents) : product.priceInCents,
      amount: data.amount ? Amount.create(data.amount) : product.amount,
      isActive: data.isActive ? data.isActive : product.isActive,
      createdAt: product.createdAt,
      updatedAt: new Date()
    });

    await this.productRepository.update(updateProduct);
  }
}
