import { ValueObject } from '@shared/domain/protocols';
import { InvalidTotalInCentsError } from '@shared/domain/errors';

export class TotalInCents implements ValueObject<number> {
  private _totalInCents: number;

  private constructor (totalInCents: number) {
    this._totalInCents = totalInCents;
  }

  static create (totalInCents: number): TotalInCents {
    const isValid = this.validate(totalInCents);
    if (!isValid) {
      throw new InvalidTotalInCentsError(totalInCents);
    }
    return new TotalInCents(totalInCents);
  }

  getValue (): number {
    return this._totalInCents;
  }

  static validate (totalInCents: number): boolean {
    if (
      !totalInCents ||
      totalInCents < 0 ||
      !Number.isInteger(totalInCents)
    ) {
      return false;
    }
    return true;
  }
}
