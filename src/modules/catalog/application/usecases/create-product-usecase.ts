import { UseCase } from '@shared/application/protocols';
import { Amount } from '@shared/domain/value-objects';
import { ProductEntity } from '@catalog/domain/entities';
import { ProductName, PriceInCents } from '@catalog/domain/value-objects';
import { CreateProductInputDto, CreateProductOutputDto } from '@catalog/application/dtos';
import { ProductRepository } from '@catalog/application/repositories';

export class CreateProductUseCase implements UseCase<CreateProductInputDto, CreateProductOutputDto> {
  constructor (
    private readonly productRepository: ProductRepository
  ) {}

  async exec (data: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const productName = ProductName.create(data.productName);
    const priceInCents = PriceInCents.create(data.priceInCents);
    const amount = Amount.create(data.amount);

    const product = ProductEntity.create({
      productName,
      priceInCents,
      amount,
      isActive: true
    });

    const productCreated = await this.productRepository.create(product);

    return productCreated.mapperToPrimitives();
  }
}
