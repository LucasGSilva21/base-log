import { Password } from '@authentication/domain/value-objects';
import { InvalidPasswordError } from '@authentication/domain/errors';

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
    const password = Password.create('hash-password', true);
    expect(password).toBeDefined();
    const getValue = password.getValue();
    expect(getValue).toBe('hash-password');
  });

  test('should return true if the compare returns true', async () => {
    const password = Password.create('hash', true);
    const compare = await password.comparePassword('hash');
    expect(compare).toBe(true);
  });

  test('should throw if provided a empty string', () => {
    const invalidPassword = '';
    expect(() => Password.create(invalidPassword)).toThrow(InvalidPasswordError);
    expect(() => Password.create(invalidPassword)).toThrow('The password provided is invalid');
  });

  test('should throw if provided a least one upper case letter', () => {
    const invalidPassword = 'invalid-password';
    expect(() => Password.create(invalidPassword)).toThrow(InvalidPasswordError);
    expect(() => Password.create(invalidPassword)).toThrow('The password provided is invalid');
  });

  test('should throw if provided a least one lower case letter', () => {
    const invalidPassword = '#INVALID#';
    expect(() => Password.create(invalidPassword)).toThrow(InvalidPasswordError);
    expect(() => Password.create(invalidPassword)).toThrow('The password provided is invalid');
  });

  test('should throw if provided a least one special character', () => {
    const invalidPassword = 'invalidPassword';
    expect(() => Password.create(invalidPassword)).toThrow(InvalidPasswordError);
    expect(() => Password.create(invalidPassword)).toThrow('The password provided is invalid');
  });
});
