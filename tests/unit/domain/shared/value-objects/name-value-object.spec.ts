import { Name } from '../../../../../src/domain/shared/value-objects';
import { DomainError } from '../../../../../src/domain/shared/errors';

describe('Name Value Object', () => {
  test('should instantiate a new Name with a valid parameter', () => {
    const validName = 'Valid Test';
    const name = new Name(validName);
    expect(name).toBeDefined();
    const getValue = name.getValue();
    expect(getValue).toBe(validName);
  });

  test('should throw a DomainError if send a invalid name', () => {
    const invalidName = 'invalid-name-123';
    expect(() => new Name(invalidName)).toThrow(DomainError);
    expect(() => new Name(invalidName)).toThrow(`The name ${invalidName} is invalid`);
  });
});
