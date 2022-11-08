import { validateEmail } from '@domain/validators';

describe('ValidateEmail', () => {
  test('should return true if the value is a valid email', () => {
    const field = 'valid@email.com';
    const isValid = validateEmail(field);
    expect(isValid).toBe(true);
  });

  test('should return false if the value is a invalid email without dot', () => {
    const field = 'valid@email';
    const isValid = validateEmail(field);
    expect(isValid).toBe(false);
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
