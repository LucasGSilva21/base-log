import { UpdateProductUseCase } from '@catalog/application/usecases';
import { ProductRepository } from '@catalog/application/repositories';
import { Id } from '@shared/domain/value-objects';
import { NotFoundEntityError } from '@shared/application/errors';
import { mockProductRepository } from '@tests/utils/mocks/repositories';
import { mockCreateProduct } from '@tests/utils/mocks/entities';
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
  sut: UpdateProductUseCase
  productRepositoryStub: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepositoryStub = mockProductRepository();
  const sut = new UpdateProductUseCase(productRepositoryStub);

  return {
    sut,
    productRepositoryStub
  };
};

describe('UpdateProductUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should not throw on success', async () => {
    const { sut } = makeSut();
    const productId = 'valid';
    const productName = 'valid';
    const priceInCents = 1000;
    const amount = 10;
    const isActive = true;
    const promise = sut.exec({
      productId,
      productName,
      priceInCents,
      amount,
      isActive
    });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should call findById of ProductRepository with correct values', async () => {
    const { sut, productRepositoryStub } = makeSut();
    const findByIdSpy = jest.spyOn(productRepositoryStub, 'findById');
    const productId = 'valid';
    const productName = 'valid';
    const id = Id.create(productId);
    await sut.exec({ productId, productName });
    expect(findByIdSpy).toHaveBeenCalledWith(id);
  });

  test('Should call update of ProductRepository with correct values', async () => {
    const { sut, productRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(productRepositoryStub, 'update');
    const productId = 'valid-uuid';
    const product = mockCreateProduct();
    await sut.exec({ productId });
    expect(updateSpy).toHaveBeenCalledWith(product);
  });

  test('Should throw if findById of ProductRepository throws', async () => {
    const { sut, productRepositoryStub } = makeSut();
    jest.spyOn(productRepositoryStub, 'findById').mockImplementationOnce(throwError);
    const productId = 'valid';
    const promise = sut.exec({ productId });
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if update of ProductRepository throws', async () => {
    const { sut, productRepositoryStub } = makeSut();
    jest.spyOn(productRepositoryStub, 'update').mockImplementationOnce(throwError);
    const productId = 'valid';
    const promise = sut.exec({ productId });
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if not found a product', async () => {
    const { sut, productRepositoryStub } = makeSut();
    jest.spyOn(productRepositoryStub, 'findById').mockImplementationOnce(null);
    const productId = 'valid';
    const promise = sut.exec({ productId });
    await expect(promise).rejects.toThrow(NotFoundEntityError);
  });
});
