import jwt from 'jsonwebtoken';

export const encrypt = (value: string): string => {
  const accessToken = jwt.sign({ id: value }, process.env.JWT_SECRET);
  return accessToken;
};
