import { CreateProductInputDto } from '@catalog/application/dtos';

export const mockCreateProductInput = (): CreateProductInputDto => ({
  productName: 'Valid Name',
  price: 1000,
  amount: 10
});
