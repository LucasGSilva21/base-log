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

  async list (): Promise<ProductEntity[]> {
    const products = await ProductModel.scan().exec();

    if (products) {
      return products.map(product => new ProductEntity({
        id: Id.create(product.id),
        productName: ProductName.create(product.productName),
        price: Price.create(product.price),
        amount: Amount.create(product.amount),
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }));
    }

    return null;
  }

  async findById (id: Id): Promise<ProductEntity> {
    const product = await ProductModel.query('id').eq(id.getValue()).exec();

    if (product) {
      return new ProductEntity({
        id: Id.create(product[0].id),
        productName: ProductName.create(product[0].productName),
        price: Price.create(product[0].price),
        amount: Amount.create(product[0].amount),
        isActive: product[0].isActive,
        createdAt: product[0].createdAt,
        updatedAt: product[0].updatedAt
      });
    }

    return null;
  }
}