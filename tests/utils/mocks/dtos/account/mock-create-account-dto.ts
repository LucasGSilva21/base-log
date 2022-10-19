import { CreateAccountDto } from '@application/dtos/account';

export const mockCreateAccountData = (): CreateAccountDto => ({
  userName: 'Valid Name',
  email: 'valid@email.com',
  password: '#Valid123#'
});
