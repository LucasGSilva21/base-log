import { ValueObject } from '@shared/domain/protocols';
import { InvalidAmountError } from '@catalog/domain/errors';

export class Amount implements ValueObject<number> {
  private _amount: number;

  private constructor (amount: number) {
    this._amount = amount;
  }

  static create (amount: number): Amount {
    const isValid = this.validate(amount);
    if (!isValid) {
      throw new InvalidAmountError(amount);
    }
    return new Amount(amount);
  }

  getValue (): number {
    return this._amount;
  }

  static validate (amount: number): boolean {
    if (
      !amount ||
      amount < 0 ||
      !Number.isInteger(amount)
    ) {
      return false;
    }
    return true;
  }
}
