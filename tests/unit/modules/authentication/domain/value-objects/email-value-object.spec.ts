
import { Email } from '@authentication/domain/value-objects';
import { InvalidEmailError } from '@authentication/domain/errors';

describe('Email Value Object', () => {
  test('should create a new email', () => {
    const validEmail = 'valid@email.com';
    const email = Email.create(validEmail);
    expect(email).toBeDefined();
    const getValue = email.getValue();
    expect(getValue).toBe(validEmail);
  });

  test('should throw if provided a invalid email', () => {
    const invalidEmail = 'invalid-email';
    expect(() => Email.create(invalidEmail)).toThrow(InvalidEmailError);
    expect(() => Email.create(invalidEmail)).toThrow(`The email "${invalidEmail}" is invalid`);
  });

  test('should throw if provided a invalid email without dot', () => {
    const invalidEmail = 'valid@email';
    expect(() => Email.create(invalidEmail)).toThrow(InvalidEmailError);
    expect(() => Email.create(invalidEmail)).toThrow(`The email "${invalidEmail}" is invalid`);
  });

  test('should throw if provided a empty string', () => {
    const invalidEmail = '';
    expect(() => Email.create(invalidEmail)).toThrow(InvalidEmailError);
    expect(() => Email.create(invalidEmail)).toThrow(`The email "${invalidEmail}" is invalid`);
  });
});
