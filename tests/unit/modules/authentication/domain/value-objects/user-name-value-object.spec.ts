import { UserName } from '@authentication/domain/value-objects';
import { InvalidUserNameError } from '@authentication/domain/errors';

describe('UserName Value Object', () => {
  test('should create a new user name', () => {
    const validUserName = 'Valid Test';
    const userName = UserName.create(validUserName);
    expect(userName).toBeDefined();
    const getValue = userName.getValue();
    expect(getValue).toBe(validUserName);
  });

  test('should throw if the value is a empty string', () => {
    const invalidUserName: any = null;
    expect(() => UserName.create(invalidUserName)).toThrow(InvalidUserNameError);
    expect(() => UserName.create(invalidUserName)).toThrow(`The user name "${invalidUserName}" is invalid`);
  });

  test('should throw if the value contains only whitespace', () => {
    const invalidUserName = ' ';
    expect(() => UserName.create(invalidUserName)).toThrow(InvalidUserNameError);
    expect(() => UserName.create(invalidUserName)).toThrow(`The user name "${invalidUserName}" is invalid`);
  });

  test('should throw if the value contains numbers', () => {
    const invalidUserName = 'invalid123';
    expect(() => UserName.create(invalidUserName)).toThrow(InvalidUserNameError);
    expect(() => UserName.create(invalidUserName)).toThrow(`The user name "${invalidUserName}" is invalid`);
  });
});
