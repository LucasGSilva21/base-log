import { SignUpInputDto } from '@application/dtos/authentication';

export const mockSignUpInput = (): SignUpInputDto => ({
  userName: 'Valid Name',
  email: 'valid@email.com',
  password: '#Valid123#'
});
