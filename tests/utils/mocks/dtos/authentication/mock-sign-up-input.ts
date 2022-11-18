import { SignUpInputDto } from '@authentication/application/dtos';

export const mockSignUpInput = (): SignUpInputDto => ({
  userName: 'Valid Name',
  email: 'valid@email.com',
  password: '#Valid123#'
});
