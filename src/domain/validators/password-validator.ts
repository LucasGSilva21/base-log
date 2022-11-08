import { hasNumber, hasLowercase, hasUppercase } from '@domain/utils';

export const validatePassword = (password: string): boolean => {
  if (
    !password ||
    password.trim().length > 255 ||
    !hasNumber.test(password) ||
    !hasLowercase.test(password) ||
    !hasUppercase.test(password)
  ) {
    return false;
  }
  return true;
};
