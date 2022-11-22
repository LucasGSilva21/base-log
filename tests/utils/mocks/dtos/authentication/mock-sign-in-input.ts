import { SignInInputDto } from '@authentication/application/dtos';

export const mockSignInInput = (): SignInInputDto => ({
  email: 'valid@email.com',
  password: '#Valid123#'
});
