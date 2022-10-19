import { AccountEntity } from '@domain/entities';
import { Id, UserName, Email, Password } from '@domain/shared/value-objects';
import { generateUuid } from '@domain/shared/helpers';

export const mockAccountWithIdSent = (isActive = true): AccountEntity => {
  const uuid = generateUuid();
  const id = new Id(uuid);
  const userName = new UserName('Valid Name');
  const email = new Email('valid@email.com');
  const password = new Password({ password: '#Valid123#' });
  const createdAt = new Date();
  const updatedAt = new Date();
  const account = new AccountEntity({
    id, userName, email, password, isActive, createdAt, updatedAt
  });

  return account;
};

export const mockAccountWithoutIdSent = (isActive = true): AccountEntity => {
  const userName = new UserName('Valid Name');
  const email = new Email('valid@email.com');
  const password = new Password({ password: '#Valid123#' });
  const account = new AccountEntity({
    userName, email, password, isActive
  });

  return account;
};
