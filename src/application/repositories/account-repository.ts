import { AccountEntity } from '@domain/entities';
import { Email } from '@domain/shared/value-objects';

export interface AccountRepository {
  create (data: AccountEntity): Promise<AccountEntity>
  findByEmail (email: Email): Promise<AccountEntity>
}
