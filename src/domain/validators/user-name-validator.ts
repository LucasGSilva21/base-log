import { hasNumber } from '@domain/utils';

export const validateUserName = (name: string): boolean => {
  if (!name || !name.trim() || name.trim().length > 255 || hasNumber.test(name)) {
    return false;
  }
  return true;
};
