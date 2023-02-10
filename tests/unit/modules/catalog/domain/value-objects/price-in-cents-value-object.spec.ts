import { PriceInCents } from '@catalog/domain/value-objects';
import { InvalidPriceInCentsError } from '@catalog/domain/errors';

describe('PriceInCents Value Object', () => {
  test('should create a new PriceInCents', () => {
    const value = 1000;
    const priceInCents = PriceInCents.create(value);
    expect(priceInCents).toBeDefined();
    const getValue = priceInCents.getValue();
    expect(getValue).toBe(value);
  });

  test('should throw if send a invalid value', () => {
    const value = -100;
    expect(() => PriceInCents.create(value)).toThrow(InvalidPriceInCentsError);
    expect(() => PriceInCents.create(value)).toThrow(`The price "${value}" is invalid`);
  });
});
