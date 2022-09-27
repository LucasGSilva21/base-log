import { BaseEntity } from '../../../../../src/domain/shared/entities';
import MockDate from 'mockdate';

describe('Base Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should instance a new base entity and return the correct values', () => {
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
