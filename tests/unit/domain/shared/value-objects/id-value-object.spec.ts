import { Id } from '@domain/shared/value-objects';
import { InvalidIdError } from '@domain/shared/errors';
import { v4 as uuidv4 } from 'uuid';

describe('Id Value Object', () => {
  test('should instantiate a new id with a valid uuid in parameter', () => {
    const uuid = uuidv4();
    const id = new Id(uuid);
    expect(id).toBeDefined();
    const getValue = id.getValue();
    expect(getValue).toBe(uuid);
  });

  test('should instantiate a new id without parameter', () => {
    const id = new Id();
    expect(id).toBeDefined();
    const getValue = id.getValue();
    expect(getValue).toBeDefined();
  });

  test('should throw a DomainError if send a invalid uuid', () => {
    const invalidUuid = 'invalid-uuid';
    expect(() => new Id(invalidUuid)).toThrow(InvalidIdError);
    expect(() => new Id(invalidUuid)).toThrow(`The id "${invalidUuid}" is invalid`);
  });
});
