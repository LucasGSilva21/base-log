import { Id } from '@shared/domain/value-objects';
import { ProductEntity } from '@catalog/domain/entities';
import { ProductName, Price, Amount } from '@catalog/domain/value-objects';
import { ProductRepository } from '@catalog/application/repositories';
import { ProductModel } from '@catalog/framework/database/models';

export class DynamodbProductRepository implements ProductRepository {
  async create (data: ProductEntity): Promise<ProductEntity> {
    const product = await ProductModel.create({
      id: data.id.getValue(),
      productName: data.productName.getValue(),
      price: data.price.getValue(),
      amount: data.amount.getValue(),
      isActive: data.isActive
    });

    return new ProductEntity({
      id: Id.create(product.id),
      productName: ProductName.create(product.productName),
      price: Price.create(product.price),
      amount: Amount.create(product.amount),
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    });
  }
}
