import { generateUuid, validateUuid } from '@shared/domain/utils';
import { ValueObject } from '@shared/domain/protocols';
import { InvalidIdError } from '@shared/domain/errors';

export class Id implements ValueObject<string> {
  private _id: string;

  private constructor(id: string) {
    this._id = id;
  }

  static create(id?: string): Id {
    if (!id) {
      return new Id(generateUuid());
    }
    const isValid = this.validate(id);
    if (!isValid) {
      throw new InvalidIdError(id);
    }
    return new Id(id);
  }

  getValue(): string {
    return this._id;
  }

  static validate(id: string): boolean {
    const isValid = validateUuid(id);
    if (!isValid) {
      return false;
    }
    return true;
  }
}
