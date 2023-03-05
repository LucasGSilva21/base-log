import { FindProductByIdUseCase } from '@catalog/application/usecases';
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
  sut: FindProductByIdUseCase
  productRepositoryStub: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepositoryStub = mockProductRepository();
  const sut = new FindProductByIdUseCase(productRepositoryStub);

  return {
    sut,
    productRepositoryStub
  };
};

describe('ListProductsUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should return a product on success', async () => {
    const { sut } = makeSut();
    const productId = 'valid';
    const result = await sut.exec({ productId });
    const product = mockCreateProduct().mapperToPrimitives();
    expect(result).toEqual({ product });
  });

  test('Should call findById of ProductRepository with correct values', async () => {
    const { sut, productRepositoryStub } = makeSut();
    const findByIdSpy = jest.spyOn(productRepositoryStub, 'findById');
    const productId = 'valid';
    const id = Id.create(productId);
    await sut.exec({ productId });
    expect(findByIdSpy).toHaveBeenCalledWith(id);
  });

  test('Should throw if findById of ProductRepository throws', async () => {
    const { sut, productRepositoryStub } = makeSut();
    jest.spyOn(productRepositoryStub, 'findById').mockImplementationOnce(throwError);
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
