import { ListProductsUseCase } from '@catalog/application/usecases';
import { ProductRepository } from '@catalog/application/repositories';
import { mockProductRepository } from '@tests/utils/mocks/repositories';
import { mockCreateProduct } from '@tests/utils/mocks/entities';
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
  sut: ListProductsUseCase
  productRepositoryStub: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepositoryStub = mockProductRepository();
  const sut = new ListProductsUseCase(productRepositoryStub);

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

  test('Should return a list of products on success', async () => {
    const { sut } = makeSut();
    const result = await sut.exec();
    const product = mockCreateProduct().mapperToPrimitives();
    expect(result).toEqual({
      products: [product]
    });
  });

  test('Should call list of ProductRepository with correct values', async () => {
    const { sut, productRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(productRepositoryStub, 'list');
    await sut.exec();
    expect(listSpy).toHaveBeenCalledWith();
  });
});
