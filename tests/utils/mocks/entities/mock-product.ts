import { Id, Amount } from '@shared/domain/value-objects';
import { generateUuid } from '@shared/domain/utils';
import { ProductEntity } from '@catalog/domain/entities';
import { ProductName, PriceInCents } from '@catalog/domain/value-objects';

export const mockLoadProduct = (isActive = true): ProductEntity => {
  const uuid = generateUuid();
  const id = Id.create(uuid);
  const productName = ProductName.create('Valid Name');
  const priceInCents = PriceInCents.create(1000);
  const amount = Amount.create(10);
  const createdAt = new Date();
  const updatedAt = new Date();
  const product = ProductEntity.create({
    id, productName, priceInCents, amount, isActive, createdAt, updatedAt
  });

  return product;
};

export const mockCreateProduct = (isActive = true): ProductEntity => {
  const productName = ProductName.create('Valid Name');
  const priceInCents = PriceInCents.create(1000);
  const amount = Amount.create(10);
  const product = ProductEntity.create({
    productName, priceInCents, amount, isActive
  });

  return product;
};
