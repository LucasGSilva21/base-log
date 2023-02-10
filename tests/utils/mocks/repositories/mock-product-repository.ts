import { ProductEntity } from '@catalog/domain/entities';
import { ProductRepository } from '@catalog/application/repositories';
import { mockCreateProduct } from '@tests/utils/mocks/entities';

export const mockProductRepository = (): ProductRepository => {
  class ProductRepositoryStub implements ProductRepository {
    async create (): Promise<ProductEntity> {
      return Promise.resolve(mockCreateProduct());
    }

    async list (): Promise<ProductEntity[]> {
      return Promise.resolve([mockCreateProduct()]);
    }

    async findById (): Promise<ProductEntity> {
      return Promise.resolve(mockCreateProduct());
    }

    async update (): Promise<void> {
      Promise.resolve();
    }
  }

  return new ProductRepositoryStub();
};
