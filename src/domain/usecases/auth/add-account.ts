import { AccountProps, AccountEntity } from '../../entities/account'

export interface AddAccount {
  add (accountProps: AccountProps): AccountEntity
}
