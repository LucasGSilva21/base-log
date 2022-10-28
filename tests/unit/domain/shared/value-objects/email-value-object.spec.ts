
import { Email } from '@domain/shared/value-objects';
import { InvalidEmailError } from '@domain/shared/errors';

describe('Email Value Object', () => {
  test('should create a new email', () => {
    const validEmail = 'valid@email.com';
    const email = Email.create(validEmail);
    expect(email).toBeDefined();
    const getValue = email.getValue();
    expect(getValue).toBe(validEmail);
  });

  test('should throw if send a invalid email', () => {
    const invalidEmail = 'invalid-email';
    expect(() => Email.load(invalidEmail)).toThrow(InvalidEmailError);
    expect(() => Email.load(invalidEmail)).toThrow(`The email "${invalidEmail}" is invalid`);
  });
});
