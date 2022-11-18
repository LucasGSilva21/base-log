import { AccountEntity } from '@domain/entities';
import { Id } from '@shared/domain/value-objects';
import { UserName, Email, Password } from '@domain/value-objects';
import { generateUuid } from '@shared/domain/utils';

export const mockLoadAccount = (isActive = true): AccountEntity => {
  const uuid = generateUuid();
  const id = Id.create(uuid);
  const userName = UserName.create('Valid Name');
  const email = Email.create('valid@email.com');
  const password = Password.create('#Valid123#');
  const createdAt = new Date();
  const updatedAt = new Date();
  const account = new AccountEntity({
    id, userName, email, password, isActive, createdAt, updatedAt
  });

  return account;
};

export const mockCreateAccount = (isActive = true): AccountEntity => {
  const userName = UserName.create('Valid Name');
  const email = Email.create('valid@email.com');
  const password = Password.create('#Valid123#');
  const account = new AccountEntity({
    userName, email, password, isActive
  });

  return account;
};
