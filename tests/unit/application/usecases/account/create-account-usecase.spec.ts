import { CreateAccountUseCase } from '../../../../../src/application/usecases/account';
import { AccountRepository } from '../../../../../src/application/repositories';
import { mockAccountWithIdSent } from '../../../../utils/mocks/entities';
import { mockAccountRepository } from '../../../../utils/mocks/repositories';
import { mockCreateAccountData } from '../../../../utils/mocks/dtos/account';
import { throwError } from '../../../../utils/helpers';
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

  test('Should call create of AccountRepository with correct values', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(accountRepositoryStub, 'create');
    await sut.exec(mockCreateAccountData());
    expect(addSpy).toHaveBeenCalledWith(mockAccountWithIdSent(false));
  });

  test('Should throw if AccountRepository throws', async () => {
    const { sut, accountRepositoryStub } = makeSut();
    jest.spyOn(accountRepositoryStub, 'create').mockImplementationOnce(throwError);
    const promise = sut.exec(mockCreateAccountData());
    await expect(promise).rejects.toThrow();
  });
});
