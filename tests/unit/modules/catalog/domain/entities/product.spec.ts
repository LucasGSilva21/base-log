import { Id, Amount } from '@shared/domain/value-objects';
import { generateUuid } from '@shared/domain/utils';
import { ProductEntity } from '@catalog/domain/entities';
import { ProductName, PriceInCents } from '@catalog/domain/value-objects';
import MockDate from 'mockdate';

interface SutTypes {
  sut: ProductEntity
  id: Id
  productName: ProductName
  priceInCents: PriceInCents
  amount: Amount
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const makeSut = (): SutTypes => {
  const uuid = generateUuid();
  const id = Id.create(uuid);
  const productName = ProductName.create('Valid Name');
  const priceInCents = PriceInCents.create(1000);
  const amount = Amount.create(10);
  const isActive = true;
  const createdAt = new Date();
  const updatedAt = new Date();
  const sut = ProductEntity.create({
    id, productName, priceInCents, amount, isActive, createdAt, updatedAt
  });

  return {
    sut, id, productName, priceInCents, amount, isActive, createdAt, updatedAt
  };
};

describe('Product Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should create a new ProductEntity sendind isActive field', () => {
    const {
      id, productName, priceInCents, amount, isActive, createdAt, updatedAt
    } = makeSut();
    const product = ProductEntity.create({
      id, productName, priceInCents, amount, isActive, createdAt, updatedAt
    });
    expect(product.id).toBe(id);
    expect(product.productName).toBe(productName);
    expect(product.priceInCents).toBe(priceInCents);
    expect(product.amount).toBe(amount);
    expect(product.isActive).toBe(isActive);
    expect(product.createdAt).toBe(createdAt);
    expect(product.updatedAt).toBe(updatedAt);
  });

  test('should create a new ProductEntity not sendind isActive field', () => {
    const {
      id, productName, priceInCents, amount, createdAt, updatedAt
    } = makeSut();
    const product = ProductEntity.create({
      id, productName, priceInCents, amount, createdAt, updatedAt
    });
    expect(product.id).toBe(id);
    expect(product.productName).toBe(productName);
    expect(product.priceInCents).toBe(priceInCents);
    expect(product.amount).toBe(amount);
    expect(product.isActive).toBe(false);
    expect(product.createdAt).toBe(createdAt);
    expect(product.updatedAt).toBe(updatedAt);
  });

  test('should return correct values when call mapper', () => {
    const {
      sut, id, productName, priceInCents, amount, isActive, createdAt, updatedAt
    } = makeSut();
    const productPrimitivesProps = sut.mapperToPrimitives();
    expect(productPrimitivesProps.id).toBe(id.getValue());
    expect(productPrimitivesProps.productName).toBe(productName.getValue());
    expect(productPrimitivesProps.priceInCents).toBe(priceInCents.getValue());
    expect(productPrimitivesProps.amount).toBe(amount.getValue());
    expect(productPrimitivesProps.isActive).toBe(isActive);
    expect(productPrimitivesProps.createdAt).toBe(createdAt);
    expect(productPrimitivesProps.updatedAt).toBe(updatedAt);
  });
});
