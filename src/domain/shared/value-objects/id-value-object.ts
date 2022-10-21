import { generateUuid, validateUuid } from '@domain/shared/helpers';
import { ValueObject } from '@domain/shared/protocols';
import { InvalidIdError } from '@domain/shared/errors';

export class Id implements ValueObject<string> {
  private _id: string;

  constructor(id: string) {
    this.validate(id);
    this._id = id;
  }

  static generateNewId(): Id {
    return new Id(generateUuid());
  }

  getValue(): string {
    return this._id;
  }

  private validate(id: string): void {
    const isValid = validateUuid(id);
    if (!isValid) {
      throw new InvalidIdError(id);
    }
  }
}
