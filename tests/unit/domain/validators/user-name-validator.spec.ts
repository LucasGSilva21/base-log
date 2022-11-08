import { validateUserName } from '@domain/validators';

describe('ValidateUserName', () => {
  test('should return true if the value contains only letters and spaces', () => {
    const field = 'Valid Name';
    const isValid = validateUserName(field);
    expect(isValid).toBe(true);
  });

  test('should return false if the value is a empty string', () => {
    const field: any = null;
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
