import { AccountEntity } from '@authentication/domain/entities';
import { Email } from '@authentication/domain/value-objects';

export interface AccountRepository {
  create (data: AccountEntity): Promise<AccountEntity>
  findByEmail (email: Email): Promise<AccountEntity>
}
