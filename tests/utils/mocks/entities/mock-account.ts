import { AccountEntity } from '@domain/entities';
import { Id, UserName, Email, Password } from '@domain/shared/value-objects';
import { generateUuid } from '@domain/shared/helpers';

export const mockLoadAccount = (isActive = true): AccountEntity => {
  const uuid = generateUuid();
  const id = Id.load(uuid);
  const userName = new UserName('Valid Name');
  const email = Email.create('valid@email.com');
  const password = new Password({ password: '#Valid123#' });
  const createdAt = new Date();
  const updatedAt = new Date();
  const account = new AccountEntity({
    id, userName, email, password, isActive, createdAt, updatedAt
  });

  return account;
};

export const mockCreateAccount = (isActive = true): AccountEntity => {
  const userName = new UserName('Valid Name');
  const email = Email.create('valid@email.com');
  const password = new Password({ password: '#Valid123#' });
  const account = new AccountEntity({
    userName, email, password, isActive
  });

  return account;
};
