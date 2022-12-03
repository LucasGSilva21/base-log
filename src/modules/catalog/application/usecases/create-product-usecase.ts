import { UseCase } from '@shared/application/protocols';
import { ProductEntity } from '@catalog/domain/entities';
import { ProductName, Price, Amount } from '@catalog/domain/value-objects';
import { CreateProductInputDto, CreateProductOutputDto } from '@catalog/application/dtos';
import { ProductRepository } from '@catalog/application/repositories';

export class CreateProductUseCase implements UseCase<CreateProductInputDto, CreateProductOutputDto> {
  constructor (
    private readonly productRepository: ProductRepository
  ) {}

  async exec (data: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const productName = ProductName.create(data.productName);
    const price = Price.create(data.price);
    const amount = Amount.create(data.amount);

    const product = new ProductEntity({
      productName,
      price,
      amount,
      isActive: true
    });

    const productCreated = await this.productRepository.create(product);

    return productCreated.mapperToPrimitives();
  }
}
