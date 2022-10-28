import { AccountEntity } from '@domain/entities';
import { AccountRepository } from '@application/repositories';
import { mockCreateAccount } from '@tests/utils/mocks/entities';

export const mockAccountRepository = (): AccountRepository => {
  class AccountRepositoryStub implements AccountRepository {
    async create (): Promise<AccountEntity> {
      return Promise.resolve(mockCreateAccount());
    }

    async findByEmail(): Promise<AccountEntity> {
      return Promise.resolve(null);
    }
  }

  return new AccountRepositoryStub();
};
