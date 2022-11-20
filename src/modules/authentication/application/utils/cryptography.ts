import jwt from 'jsonwebtoken';

export const encrypt = (value: string): string => {
  const accessToken = jwt.sign({ id: value }, 'secret');
  return accessToken;
};
