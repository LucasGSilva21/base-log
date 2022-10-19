import { AccountEntity } from '../../../../src/domain/entities';
import { AccountRepository } from '../../../../src/application/repositories';
import { mockAccountWithoutIdSent } from '../entities';

export const mockAccountRepository = (): AccountRepository => {
  class AccountRepositoryStub implements AccountRepository {
    async create (): Promise<AccountEntity> {
      return Promise.resolve(mockAccountWithoutIdSent());
    }

    async findByEmail(): Promise<AccountEntity> {
      return Promise.resolve(null);
    }
  }

  return new AccountRepositoryStub();
};
