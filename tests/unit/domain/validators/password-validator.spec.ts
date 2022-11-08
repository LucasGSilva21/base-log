import { validatePassword } from '@domain/validators';

describe('ValidatePassword', () => {
  test('should return true if the value is a valid password', () => {
    const field = '#Valid123#';
    const isValid = validatePassword(field);
    expect(isValid).toBe(true);
  });

  test('should return false if the value is a empty string', () => {
    const field = '';
    const isValid = validatePassword(field);
    expect(isValid).toBe(false);
  });

  test('should return false if the value not has a least one upper case letter', () => {
    const field = 'invalid-password';
    const isValid = validatePassword(field);
    expect(isValid).toBe(false);
  });

  test('should return false if the value not has a least one lower case letter', () => {
    const field = '#INVALID#';
    const isValid = validatePassword(field);
    expect(isValid).toBe(false);
  });

  test('should return false if the value not has a least one special character', () => {
    const field = 'invalidPassword';
    const isValid = validatePassword(field);
    expect(isValid).toBe(false);
  });
});
