import { AccountEntity } from '../../../../src/domain/entities';
import { AccountRepository } from '../../../../src/application/repositories';
import { mockAccountWithoutIdSent } from '../entities';

export const mockAccountRepository = (): AccountRepository => {
  class AccountRepositoryStub implements AccountRepository {
    async create (): Promise<AccountEntity> {
      return Promise.resolve(mockAccountWithoutIdSent());
    }
  }

  return new AccountRepositoryStub();
};
