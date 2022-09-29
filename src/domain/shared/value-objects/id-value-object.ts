import { generateUuid, validateUuid } from '../helpers';
import { ValueObject } from '../protocols';
import { DomainError } from '../errors';

export class Id implements ValueObject<string> {
  private _id: string;

  constructor(id?: string) {
    if (id) {
      this.validate(id);
    }
    this._id = id || generateUuid();
  }

  getValue(): string {
    return this._id;
  }

  private validate(id: string): void {
    const isValid = validateUuid(id);
    if (!isValid) {
      throw new DomainError('Id');
    }
  }
}
