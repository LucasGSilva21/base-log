import bcrypt from 'bcrypt';

const salt = 12;

export const hash = (value: string): string => {
  return bcrypt.hashSync(value, salt);
};

export const compare = async (value: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(value, hash);
};
