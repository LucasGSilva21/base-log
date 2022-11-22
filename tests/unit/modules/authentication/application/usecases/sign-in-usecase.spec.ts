import { SignInUseCase } from '@authentication/application/usecases';
import { AccountRepository } from '@authentication/application/repositories';
import { mockLoadAccount } from '@tests/utils/mocks/entities';
import { mockAccountRepository } from '@tests/utils/mocks/repositories';
import { mockSignInInput } from '@tests/utils/mocks/dtos/authentication';
import { throwError } from '@tests/utils/utils';
import MockDate from 'mockdate';
import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hashSync (): string {
    return 'hash';
  },

  compare (): boolean {
    return true;
  }
}));

interface SutTypes {
  sut: SignInUseCase
  accountRepositoryStub: AccountRepository
}

const makeSut = (): SutTypes => {
  const accountRepositoryStub = mockAccountRepository();
  const sut = new SignInUseCase(accountRepositoryStub);

  return {
    sut,
    accountRepositoryStub
  };
};

describe('Account Entity', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'secret';
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call findByEmail of AccountRepository with correct values', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    const findByEmailSpy = jest.spyOn(accountRepositoryStub, 'findByEmail').mockImplementationOnce(() => Promise.resolve(mockLoadAccount()));
    await sut.exec(mockSignInInput());
    expect(findByEmailSpy).toHaveBeenCalledWith(mockLoadAccount().email);
  });

  test('Should throw if findByEmail of AccountRepository throws', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(accountRepositoryStub, 'findByEmail').mockImplementationOnce(throwError);
    const promise = sut.exec(mockSignInInput());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if the email provided not exists', async () => {
    const { sut } = makeSut();
    const promise = sut.exec(mockSignInInput());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if the password provided is not correct', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false));
    jest.spyOn(accountRepositoryStub, 'findByEmail').mockImplementationOnce(async () => Promise.resolve(mockLoadAccount()));
    const promise = sut.exec({
      email: 'valid@email.com',
      password: '#Invalid123#'
    });
    await expect(promise).rejects.toThrow();
  });
});
