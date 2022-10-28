import { Password } from '@domain/shared/value-objects';
import { InvalidPasswordError } from '@domain/shared/errors';

jest.mock('bcrypt', () => ({
  hashSync (): string {
    return 'hash';
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true);
  }
}));

describe('Password Value Object', () => {
  test('should create a new Password and hash the value', () => {
    const password = Password.create('#Valid123#');
    expect(password).toBeDefined();
    const getValue = password.getValue();
    expect(getValue).toBe('hash');
  });

  test('should load a Password and not hash the value', () => {
    const password = Password.load('hash-password');
    expect(password).toBeDefined();
    const getValue = password.getValue();
    expect(getValue).toBe('hash-password');
  });

  test('should return true if the compare returns true', async () => {
    const password = Password.load('hash');
    const compare = await password.comparePassword('hash');
    expect(compare).toBe(true);
  });

  test('should throw if send a invalid password', () => {
    const invalidPassword = 'invalid';
    expect(() => Password.create(invalidPassword)).toThrow(InvalidPasswordError);
    expect(() => Password.create(invalidPassword)).toThrow('The password provided is invalid');
  });
});
