import { CreateAccountUseCase } from '@application/usecases/account';
import { AccountRepository } from '@application/repositories';
import { mockAccountWithIdSent } from '@tests/utils/mocks/entities';
import { mockAccountRepository } from '@tests/utils/mocks/repositories';
import { mockCreateAccountData } from '@tests/utils/mocks/dtos/account';
import { throwError } from '@tests/utils/helpers';
import MockDate from 'mockdate';

jest.mock('bcrypt', () => ({
  hashSync (): string {
    return 'hash';
  }
}));

jest.mock('uuid', () => ({
  v4 (): string {
    return 'valid-uuid';
  },

  validate (): boolean {
    return true;
  }
}));

interface SutTypes {
  sut: CreateAccountUseCase
  accountRepositoryStub: AccountRepository
}

const makeSut = (): SutTypes => {
  const accountRepositoryStub = mockAccountRepository();
  const sut = new CreateAccountUseCase(accountRepositoryStub);

  return {
    sut,
    accountRepositoryStub
  };
};

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call findByEmail of AccountRepository with correct values', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    const findByEmailSpy = jest.spyOn(accountRepositoryStub, 'findByEmail');
    await sut.exec(mockCreateAccountData());
    expect(findByEmailSpy).toHaveBeenCalledWith(mockAccountWithIdSent().email);
  });

  test('Should call create of AccountRepository with correct values', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(accountRepositoryStub, 'create');
    await sut.exec(mockCreateAccountData());
    expect(addSpy).toHaveBeenCalledWith(mockAccountWithIdSent(false));
  });

  test('Should throw if findByEmail of AccountRepository throws', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(accountRepositoryStub, 'findByEmail').mockImplementationOnce(throwError);
    const promise = sut.exec(mockCreateAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if create of AccountRepository throws', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(accountRepositoryStub, 'create').mockImplementationOnce(throwError);
    const promise = sut.exec(mockCreateAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if the email provided already exists', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(accountRepositoryStub, 'findByEmail').mockResolvedValueOnce(mockAccountWithIdSent());
    const promise = sut.exec(mockCreateAccountData());
    await expect(promise).rejects.toThrow();
  });
});
