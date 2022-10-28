import { BaseEntity } from '@domain/shared/entities';
import { Id } from '@domain/shared/value-objects';
import MockDate from 'mockdate';

interface SutTypes {
  sut: BaseEntity
  id: Id
  createdAt: Date
  updatedAt: Date
}

const makeSut = (
  _id?: Id,
  _createdAt?: Date,
  _updatedAt?: Date
): SutTypes => {
  const id = _id || Id.create();
  const createdAt = _createdAt || new Date();
  const updatedAt = _updatedAt || new Date();
  const sut = new BaseEntity(id, createdAt, updatedAt);

  return {
    sut, id, createdAt, updatedAt
  };
};

describe('Base Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should instantiate a new base entity with parameters', () => {
    const _id = Id.create();
    const _createdAt = new Date();
    const _updatedAt = new Date();
    const { sut, id, createdAt, updatedAt } = makeSut(_id, _createdAt, _updatedAt);
    expect(sut).toBeDefined();
    expect(sut.id).toEqual(id);
    expect(sut.createdAt).toEqual(createdAt);
    expect(sut.updatedAt).toEqual(updatedAt);
  });

  test('should instantiate a new base entity without parameters', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut.id).toBeDefined();
    expect(sut.createdAt).toEqual(new Date());
    expect(sut.updatedAt).toEqual(new Date());
  });

  test('should set a new updated at', () => {
    const { sut } = makeSut();
    expect(sut.updatedAt).toEqual(new Date());
    const newUpdatedAt = new Date();
    sut.updatedAt = newUpdatedAt;
    expect(sut.updatedAt).toEqual(newUpdatedAt);
  });
});
