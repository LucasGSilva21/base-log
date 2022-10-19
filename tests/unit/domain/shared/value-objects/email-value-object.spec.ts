
import { Email } from '@domain/shared/value-objects';
import { DomainError } from '@domain/shared/errors';

describe('Email Value Object', () => {
  test('should instantiate a new Email with a valid parameter', () => {
    const validEmail = 'valid@email.com';
    const email = new Email(validEmail);
    expect(email).toBeDefined();
    const getValue = email.getValue();
    expect(getValue).toBe(validEmail);
  });

  test('should throw a DomainError if send a invalid email', () => {
    const invalidEmail = 'invalid-email';
    expect(() => new Email(invalidEmail)).toThrow(DomainError);
    expect(() => new Email(invalidEmail)).toThrow(`The email ${invalidEmail} is invalid`);
  });
});
