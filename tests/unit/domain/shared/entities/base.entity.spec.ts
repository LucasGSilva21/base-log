import { BaseEntity } from '../../../../../src/domain/shared/entities';
import { Id } from '../../../../../src/domain/shared/value-objects';
import MockDate from 'mockdate';

describe('Base Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should instantiate a new base entity with parameters', () => {
    const id = new Id();
    const createdAt = new Date();
    const updatedAt = new Date();
    const base = new BaseEntity(id, createdAt, updatedAt);
    expect(base).toBeDefined();
    expect(base.id).toEqual(id);
    expect(base.createdAt).toEqual(createdAt);
    expect(base.updatedAt).toEqual(updatedAt);
  });

  test('should instantiate a new base entity without parameters', () => {
    const base = new BaseEntity();
    expect(base).toBeDefined();
    expect(base.id).toBeDefined();
    expect(base.createdAt).toEqual(new Date());
    expect(base.updatedAt).toEqual(new Date());
  });

  test('should set a new updated at', () => {
    const base = new BaseEntity();
    expect(base.updatedAt).toEqual(new Date());
    const newUpdatedAt = new Date();
    base.updatedAt = newUpdatedAt;
    expect(base.updatedAt).toEqual(newUpdatedAt);
  });
});
