import { AccountEntity } from '../../domain/entities';

export interface AccountRepository {
  create (data: AccountEntity): Promise<AccountEntity>
}
