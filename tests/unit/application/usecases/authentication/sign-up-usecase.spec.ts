import { SignUpUseCase } from '@application/usecases/authentication';
import { AccountRepository } from '@application/repositories';
import { mockLoadAccount } from '@tests/utils/mocks/entities';
import { mockAccountRepository } from '@tests/utils/mocks/repositories';
import { mockSignUpInput } from '@tests/utils/mocks/dtos/authentication';
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
  sut: SignUpUseCase
  accountRepositoryStub: AccountRepository
}

const makeSut = (): SutTypes => {
  const accountRepositoryStub = mockAccountRepository();
  const sut = new SignUpUseCase(accountRepositoryStub);

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
    await sut.exec(mockSignUpInput());
    expect(findByEmailSpy).toHaveBeenCalledWith(mockLoadAccount().email);
  });

  test('Should call create of AccountRepository with correct values', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(accountRepositoryStub, 'create');
    await sut.exec(mockSignUpInput());
    expect(addSpy).toHaveBeenCalledWith(mockLoadAccount(false));
  });

  test('Should throw if findByEmail of AccountRepository throws', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(accountRepositoryStub, 'findByEmail').mockImplementationOnce(throwError);
    const promise = sut.exec(mockSignUpInput());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if create of AccountRepository throws', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(accountRepositoryStub, 'create').mockImplementationOnce(throwError);
    const promise = sut.exec(mockSignUpInput());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if the email provided already exists', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(accountRepositoryStub, 'findByEmail').mockResolvedValueOnce(mockLoadAccount());
    const promise = sut.exec(mockSignUpInput());
    await expect(promise).rejects.toThrow();
  });
});
