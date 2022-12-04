import { Id } from '@shared/domain/value-objects';
import { generateUuid } from '@shared/domain/utils';
import { ProductEntity } from '@catalog/domain/entities';
import { ProductName, Price, Amount } from '@catalog/domain/value-objects';
import MockDate from 'mockdate';

interface SutTypes {
  sut: ProductEntity
  id: Id
  productName: ProductName
  price: Price
  amount: Amount
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const makeSut = (): SutTypes => {
  const uuid = generateUuid();
  const id = Id.create(uuid);
  const productName = ProductName.create('Valid Name');
  const price = Price.create(1000);
  const amount = Amount.create(10);
  const isActive = true;
  const createdAt = new Date();
  const updatedAt = new Date();
  const sut = new ProductEntity({
    id, productName, price, amount, isActive, createdAt, updatedAt
  });

  return {
    sut, id, productName, price, amount, isActive, createdAt, updatedAt
  };
};

describe('Product Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should create a new ProductEntity', () => {
    const {
      sut, id, productName, price, amount, isActive, createdAt, updatedAt
    } = makeSut();
    expect(sut.id).toBe(id);
    expect(sut.productName).toBe(productName);
    expect(sut.price).toBe(price);
    expect(sut.amount).toBe(amount);
    expect(sut.isActive).toBe(isActive);
    expect(sut.createdAt).toBe(createdAt);
    expect(sut.updatedAt).toBe(updatedAt);
  });

  test('should return correct values when call mapper', () => {
    const {
      sut, id, productName, price, amount, isActive, createdAt, updatedAt
    } = makeSut();
    const productPrimitivesProps = sut.mapperToPrimitives();
    expect(productPrimitivesProps.id).toBe(id.getValue());
    expect(productPrimitivesProps.productName).toBe(productName.getValue());
    expect(productPrimitivesProps.price).toBe(price.getValue());
    expect(productPrimitivesProps.amount).toBe(amount.getValue());
    expect(productPrimitivesProps.isActive).toBe(isActive);
    expect(productPrimitivesProps.createdAt).toBe(createdAt);
    expect(productPrimitivesProps.updatedAt).toBe(updatedAt);
  });
});