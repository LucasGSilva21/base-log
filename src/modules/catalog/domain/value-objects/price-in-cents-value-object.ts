import { ValueObject } from '@shared/domain/protocols';
import { InvalidPriceInCentsError } from '@catalog/domain/errors';

export class PriceInCents implements ValueObject<number> {
  private _priceInCents: number;

  private constructor (priceInCents: number) {
    this._priceInCents = priceInCents;
  }

  static create (priceInCents: number): PriceInCents {
    const isValid = this.validate(priceInCents);
    if (!isValid) {
      throw new InvalidPriceInCentsError(priceInCents);
    }
    return new PriceInCents(priceInCents);
  }

  getValue (): number {
    return this._priceInCents;
  }

  static validate (priceInCents: number): boolean {
    if (
      !priceInCents ||
      priceInCents < 0 ||
      !Number.isInteger(priceInCents)
    ) {
      return false;
    }
    return true;
  }
}
