import { hasNumber, hasLowercase, hasUppercase } from '@domain/utils';

describe('hasNumber', () => {
  test('should return true if the value contains a number', () => {
    const value = 'valid123';
    expect(hasNumber.test(value)).toBe(true);
  });

  test('should return false if the value not contains a number', () => {
    const value = 'invalid';
    expect(hasNumber.test(value)).toBe(false);
  });
});

describe('hasLowercase', () => {
  test('should return true if the value contains a lowercase', () => {
    const value = 'valid';
    expect(hasLowercase.test(value)).toBe(true);
  });

  test('should return false if the value not contains a lowercase', () => {
    const value = 'INVALID';
    expect(hasLowercase.test(value)).toBe(false);
  });
});

describe('hasUppercase', () => {
  test('should return true if the value contains a uppercase', () => {
    const value = 'VALID';
    expect(hasUppercase.test(value)).toBe(true);
  });

  test('should return false if the value not contains a uppercase', () => {
    const value = 'invalid';
    expect(hasUppercase.test(value)).toBe(false);
  });
});
