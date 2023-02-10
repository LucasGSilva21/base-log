import { CheckStockUseCase } from '@catalog/application/usecases';
import { ProductRepository } from '@catalog/application/repositories';
import { Id } from '@shared/domain/value-objects';
import { NotFoundEntityError } from '@shared/application/errors';
import { mockProductRepository } from '@tests/utils/mocks/repositories';
import { throwError } from '@tests/utils/utils';
import MockDate from 'mockdate';

jest.mock('uuid', () => ({
  v4 (): string {
    return 'valid-uuid';
  },

  validate (): boolean {
    return true;
  }
}));

interface SutTypes {
  sut: CheckStockUseCase
  productRepositoryStub: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepositoryStub = mockProductRepository();
  const sut = new CheckStockUseCase(productRepositoryStub);

  return {
    sut,
    productRepositoryStub
  };
};

describe('CheckStockUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should return success when product is available', async () => {
    const { sut } = makeSut();
    const productId = 'valid';
    const amount = 10;
    const result = await sut.exec({ productId, amount });
    expect(result).toEqual({
      isAvailable: true,
      availableQuantity: 10
    });
  });

  test('Should return success when product not is available', async () => {
    const { sut } = makeSut();
    const productId = 'valid';
    const amount = 20;
    const result = await sut.exec({ productId, amount });
    expect(result).toEqual({
      isAvailable: false,
      availableQuantity: 10
    });
  });

  test('Should call findById of ProductRepository with correct values', async () => {
    const { sut, productRepositoryStub } = makeSut();
    const findByIdSpy = jest.spyOn(productRepositoryStub, 'findById');
    const productId = 'valid';
    const amount = 10;
    await sut.exec({ productId, amount });
    const id = Id.create(productId);
    expect(findByIdSpy).toHaveBeenCalledWith(id);
  });

  test('Should throw if findById of ProductRepository throws', async () => {
    const { sut, productRepositoryStub } = makeSut();
    jest.spyOn(productRepositoryStub, 'findById').mockImplementationOnce(throwError);
    const promise = sut.exec({
      productId: 'valid',
      amount: 10
    });
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if findById of ProductRepository throws', async () => {
    const { sut, productRepositoryStub } = makeSut();
    jest.spyOn(productRepositoryStub, 'findById').mockImplementationOnce(throwError);
    const promise = sut.exec({
      productId: 'valid',
      amount: 10
    });
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if not found a product', async () => {
    const { sut, productRepositoryStub } = makeSut();
    jest.spyOn(productRepositoryStub, 'findById').mockImplementationOnce(null);
    const promise = sut.exec({
      productId: 'valid',
      amount: 10
    });
    await expect(promise).rejects.toThrow(NotFoundEntityError);
  });
});
