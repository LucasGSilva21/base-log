import { ValueObject } from '@shared/domain/protocols';
import { InvalidProductNameError } from '@catalog/domain/errors';
import { validateProductName } from '@catalog/domain/validators';

export class ProductName implements ValueObject<string> {
  private _productName: string;

  private constructor(productName: string) {
    this._productName = productName;
  }

  static create(productName: string): ProductName {
    const isValid = this.validate(productName);
    if (!isValid) {
      throw new InvalidProductNameError(productName);
    }
    return new ProductName(productName);
  }

  getValue(): string {
    return this._productName;
  }

  static validate(productName: string): boolean {
    const isValid = validateProductName(productName);
    if (!isValid) {
      return false;
    }
    return true;
  }
}
