import { validateUserName, validateEmail, validatePassword } from '@domain/utils';

describe('ValidateUserName', () => {
  test('should return true if the value contains only letters and spaces', () => {
    const field = 'Valid Name';
    const isValid = validateUserName(field);
    expect(isValid).toBe(true);
  });

  test('should return false if the value is a empty string', () => {
    const field = '';
    const isValid = validateUserName(field);
    expect(isValid).toBe(false);
  });

  test('should return false if the value contains only whitespace', () => {
    const field = ' ';
    const isValid = validateUserName(field);
    expect(isValid).toBe(false);
  });

  test('should return false if the value contains numbers', () => {
    const field = 'invalid123';
    const isValid = validateUserName(field);
    expect(isValid).toBe(false);
  });
});

describe('ValidateEmail', () => {
  test('should return true if the value is a valid email', () => {
    const field = 'valid@email.com';
    const isValid = validateEmail(field);
    expect(isValid).toBe(true);
  });

  test('should return true if the value is a valid email without dot', () => {
    const field = 'valid@email';
    const isValid = validateEmail(field);
    expect(isValid).toBe(true);
  });

  test('should return false if the value is a empty string', () => {
    const field = '';
    const isValid = validateEmail(field);
    expect(isValid).toBe(false);
  });

  test('should return false if the value is a invalid email', () => {
    const field = 'invalid-email';
    const isValid = validateEmail(field);
    expect(isValid).toBe(false);
  });
});

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
