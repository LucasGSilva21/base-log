import bcrypt from 'bcrypt';
import { hash, compare } from '../../../../../src/domain/shared/helpers';

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash');
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true);
  }
}));

const salt = 12;

describe('Hash', () => {
  test('should call hash with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('should return a valid hash on hash success', async () => {
    const hashValue = await hash('any_value');
    expect(hashValue).toBe('hash');
  });

  test('should throw if hash throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = hash('any_value');
    await expect(promise).rejects.toThrow();
  });
});

describe('Compare', () => {
  test('should call compare with correct values', async () => {
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  test('should return true when compare succeds', async () => {
    const isValid = await compare('any_value', 'any_hash');
    expect(isValid).toBe(true);
  });

  test('should return false when compare fails', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
    const isValid = await compare('any_value', 'any_hash');
    expect(isValid).toBe(false);
  });

  test('should throw if compare throws', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = compare('any_value', 'any_hash');
    await expect(promise).rejects.toThrow();
  });
});
