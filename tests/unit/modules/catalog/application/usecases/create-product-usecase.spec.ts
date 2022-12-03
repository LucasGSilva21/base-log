import { CreateProductUseCase } from '@catalog/application/usecases';
import { ProductRepository } from '@catalog/application/repositories';
import { mockLoadProduct } from '@tests/utils/mocks/entities';
import { mockProductRepository } from '@tests/utils/mocks/repositories';
import { mockCreateProductInput } from '@tests/utils/mocks/dtos/catalog';
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
  sut: CreateProductUseCase
  productRepositoryStub: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepositoryStub = mockProductRepository();
  const sut = new CreateProductUseCase(productRepositoryStub);

  return {
    sut,
    productRepositoryStub
  };
};

describe('Product Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call create of ProductRepository with correct values', async () => {
    const { sut, productRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(productRepositoryStub, 'create');
    await sut.exec(mockCreateProductInput());
    expect(addSpy).toHaveBeenCalledWith(mockLoadProduct(true));
  });

  test('Should throw if create of ProductRepository throws', async () => {
    const { sut, productRepositoryStub } = makeSut();
    jest.spyOn(productRepositoryStub, 'create').mockImplementationOnce(throwError);
    const promise = sut.exec(mockCreateProductInput());
    await expect(promise).rejects.toThrow();
  });
});
