import { Id } from '@shared/domain/value-objects';
import { InvalidIdError } from '@shared/domain/errors';
import { v4 as uuidv4 } from 'uuid';

describe('Id Value Object', () => {
  test('should create a new Id with provided param', () => {
    const uuid = uuidv4();
    const id = Id.create(uuid);
    const getValue = id.getValue();
    expect(getValue).toBe(uuid);
  });

  test('should create a new Id without provided param', () => {
    const id = Id.create();
    expect(id).toBeDefined();
    const getValue = id.getValue();
    expect(getValue).toBeDefined();
  });

  test('should throw if send a invalid uuid', () => {
    const invalidUuid = 'invalid-uuid';
    expect(() => Id.create(invalidUuid)).toThrow(InvalidIdError);
    expect(() => Id.create(invalidUuid)).toThrow(`The id "${invalidUuid}" is invalid`);
  });
});
