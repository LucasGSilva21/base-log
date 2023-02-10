import { ProductName } from '@catalog/domain/value-objects';
import { InvalidProductNameError } from '@catalog/domain/errors';

describe('ProductName Value Object', () => {
  test('should create a new ProductName', () => {
    const value = 'valid';
    const productName = ProductName.create(value);
    expect(productName).toBeDefined();
    const getValue = productName.getValue();
    expect(getValue).toBe(value);
  });

  test('should throw if send a invalid value', () => {
    const value = '';
    expect(() => ProductName.create(value)).toThrow(InvalidProductNameError);
    expect(() => ProductName.create(value)).toThrow(`The product name "${value}" is invalid`);
  });
});
