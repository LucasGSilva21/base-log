import { ValueObject } from '@shared/domain/protocols';
import { InvalidPriceError } from '@catalog/domain/errors';
import { validatePrice } from '@catalog/domain/validators';

export class Price implements ValueObject<number> {
  private _price: number;

  private constructor(price: number) {
    this._price = price;
  }

  static create(price: number): Price {
    const isValid = this.validate(price);
    if (!isValid) {
      throw new InvalidPriceError(price);
    }
    return new Price(price);
  }

  getValue(): number {
    return this._price;
  }

  static validate(price: number): boolean {
    const isValid = validatePrice(price);
    if (!isValid) {
      return false;
    }
    return true;
  }
}
