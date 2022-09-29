import { validateUserName, validateEmail } from '../../../../../src/domain/shared/helpers';

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
