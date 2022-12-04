import { ProductEntity } from '@catalog/domain/entities';
import { ProductRepository } from '@catalog/application/repositories';
import { mockCreateProduct } from '@tests/utils/mocks/entities';

export const mockProductRepository = (): ProductRepository => {
  class ProductRepositoryStub implements ProductRepository {
    async create (): Promise<ProductEntity> {
      return Promise.resolve(mockCreateProduct());
    }
  }

  return new ProductRepositoryStub();
};