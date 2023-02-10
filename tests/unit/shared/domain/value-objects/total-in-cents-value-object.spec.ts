import { TotalInCents } from '@shared/domain/value-objects';
import { InvalidTotalInCentsError } from '@shared/domain/errors';

describe('TotalInCents Value Object', () => {
  test('should create a new TotalInCents', () => {
    const value = 1000;
    const totalInCents = TotalInCents.create(value);
    expect(totalInCents).toBeDefined();
    const getValue = totalInCents.getValue();
    expect(getValue).toBe(value);
  });

  test('should throw if send a invalid value', () => {
    const value = -100;
    expect(() => TotalInCents.create(value)).toThrow(InvalidTotalInCentsError);
    expect(() => TotalInCents.create(value)).toThrow(`The value "${value}" is invalid`);
  });
});
