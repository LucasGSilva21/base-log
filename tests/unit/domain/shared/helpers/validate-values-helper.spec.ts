import { validateName } from '../../../../../src/domain/shared/helpers';

describe('ValidateName Helper', () => {
  test('should return true if the value contains only letters and spaces', () => {
    const field = 'Valid Name';
    const isValid = validateName(field);
    expect(isValid).toBe(true);
  });

  test('should return false if the value is a empty string', () => {
    const field = '';
    const isValid = validateName(field);
    expect(isValid).toBe(false);
  });

  test('should return false if the value contains only whitespace', () => {
    const field = ' ';
    const isValid = validateName(field);
    expect(isValid).toBe(false);
  });

  test('should return false if the value contains numbers', () => {
    const field = 'invalid123';
    const isValid = validateName(field);
    expect(isValid).toBe(false);
  });
});
