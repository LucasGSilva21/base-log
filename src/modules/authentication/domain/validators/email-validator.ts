import { isEmail } from 'class-validator';

export const validateEmail = (email: string): boolean => {
  if (!email || email.trim().length > 255 || !isEmail(email)) {
    return false;
  }
  return true;
};
