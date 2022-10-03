import { AccountEntity } from '../../../domain/entities';

export interface CreateAccountRepository {
  create (data: AccountEntity): Promise<AccountEntity>
}
