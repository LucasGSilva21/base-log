import { UseCase } from '@shared/application/protocols';
import { ProductEntity } from '@catalog/domain/entities';
import { ProductName, PriceInCents, Amount } from '@catalog/domain/value-objects';
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

    const product = new ProductEntity({
      productName,
      priceInCents,
      amount,
      isActive: true
    });

    const productCreated = await this.productRepository.create(product);

    return productCreated.mapperToPrimitives();
  }
}
