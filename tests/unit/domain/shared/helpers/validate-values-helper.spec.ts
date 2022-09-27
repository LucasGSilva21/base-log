import { onlyLettersAndSpaces } from '../../../../../src/domain/shared/helpers';

describe('OnlyLettersAndSpaces Helper', () => {
  test('should return true if the string contains only letter and spaces', () => {
    const field = 'valid example';
    const isValid = onlyLettersAndSpaces(field);
    expect(isValid).toBe(true);
  });

  test('should return false if the string not contains only letter and spaces', () => {
    const field = 'invalid example_01';
    const isValid = onlyLettersAndSpaces(field);
    expect(isValid).toBe(false);
  });
});
