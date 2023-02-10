import { Amount } from '@shared/domain/value-objects';
import { InvalidAmountError } from '@shared/domain/errors';

describe('Amount Value Object', () => {
  test('should create a new Amount', () => {
    const value = 1000;
    const amount = Amount.create(value);
    expect(amount).toBeDefined();
    const getValue = amount.getValue();
    expect(getValue).toBe(value);
  });

  test('should throw if send a invalid value', () => {
    const value = -100;
    expect(() => Amount.create(value)).toThrow(InvalidAmountError);
    expect(() => Amount.create(value)).toThrow(`The amount "${value}" is invalid`);
  });
});
