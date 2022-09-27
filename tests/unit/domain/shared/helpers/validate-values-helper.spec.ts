import { validateName } from '../../../../../src/domain/shared/helpers';

describe('ValidateName Helper', () => {
  test('should return true if the string contains only letters and spaces', () => {
    const field = 'valid example';
    const isValid = validateName(field);
    expect(isValid).toBe(true);
  });

  test('should return false if the string not contains only letters and spaces', () => {
    const field = 'invalid example_01';
    const isValid = validateName(field);
    expect(isValid).toBe(false);
  });
});
