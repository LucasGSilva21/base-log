import { RegisterInputDto } from '@application/dtos/authentication';

export const mockRegisterInput = (): RegisterInputDto => ({
  userName: 'Valid Name',
  email: 'valid@email.com',
  password: '#Valid123#'
});
