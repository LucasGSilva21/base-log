import { CreateProductInputDto } from '@catalog/application/dtos';

export const mockCreateProductInput = (): CreateProductInputDto => ({
  productName: 'Valid Name',
  priceInCents: 1000,
  amount: 10
});
