import { ProductEntity } from '@catalog/domain/entities';

export interface ProductRepository {
  create (data: ProductEntity): Promise<ProductEntity>
  list (): Promise<ProductEntity[]>
}
