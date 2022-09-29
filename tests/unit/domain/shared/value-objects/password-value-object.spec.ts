import { Password } from '../../../../../src/domain/shared/value-objects';
import { DomainError } from '../../../../../src/domain/shared/errors';

jest.mock('bcrypt', () => ({
  hashSync (): string {
    return 'hash';
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true);
  }
}));

describe('Password Value Object', () => {
  test('should instantiate a new Password and hash the value', () => {
    const validPassword = { password: '#Valid123#' };
    const password = new Password(validPassword);
    expect(password).toBeDefined();
    const getValue = password.getValue();
    expect(getValue).toBe('hash');
  });

  test('should instantiate a new Password and not hash the value', () => {
    const validPassword = { passwordHash: 'hash-password' };
    const password = new Password(validPassword);
    expect(password).toBeDefined();
    const getValue = password.getValue();
    expect(getValue).toBe('hash-password');
  });

  test('should return true if the compare returns true', async () => {
    const validPassword = { passwordHash: 'hash' };
    const password = new Password(validPassword);
    const compare = await password.comparePassword('hash');
    expect(compare).toBe(true);
  });

  test('should throw a DomainError if send a invalid password', () => {
    const invalidPassword = { password: 'invalid' };
    expect(() => new Password(invalidPassword)).toThrow(DomainError);
    expect(() => new Password(invalidPassword)).toThrow(`The password ${invalidPassword.password} is invalid`);
  });

  test('should throw a DomainError if send a blank object', () => {
    const invalidPassword = {};
    expect(() => new Password(invalidPassword)).toThrow(DomainError);
    expect(() => new Password(invalidPassword)).toThrow('A password or a password hash is required');
  });
});
