import bcrypt from 'bcrypt';

const salt = 12;

export const hash = async (value: string): Promise<string> => {
  return bcrypt.hash(value, salt);
};

export const compare = async (value: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(value, hash);
};
