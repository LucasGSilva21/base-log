import { Id } from '../../../../../src/domain/shared/value-objects';
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
});
