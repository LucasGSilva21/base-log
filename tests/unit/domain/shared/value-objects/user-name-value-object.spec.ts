import { UserName } from '@domain/shared/value-objects';
import { InvalidUserNameError } from '@domain/shared/errors';

describe('UserName Value Object', () => {
  test('should instantiate a new UserName with a valid parameter', () => {
    const validUserName = 'Valid Test';
    const userName = new UserName(validUserName);
    expect(userName).toBeDefined();
    const getValue = userName.getValue();
    expect(getValue).toBe(validUserName);
  });

  test('should throw a DomainError if send a invalid name', () => {
    const invalidUserName = 'invalid-user-name-123';
    expect(() => new UserName(invalidUserName)).toThrow(InvalidUserNameError);
    expect(() => new UserName(invalidUserName)).toThrow(`The user name "${invalidUserName}" is invalid`);
  });
});
