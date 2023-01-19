import jwt from 'jsonwebtoken';

export interface EncryptInput {
  id: string,
  isAdmin: boolean
}

export const encrypt = (input: EncryptInput): string => {
  const accessToken = jwt.sign({
    id: input.id,
    isAdmin: input.isAdmin || false
  }, process.env.JWT_SECRET);
  return accessToken;
};
