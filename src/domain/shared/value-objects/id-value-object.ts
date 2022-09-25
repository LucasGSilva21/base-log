import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { ValueObject } from '../protocols';
import { DomainError } from '../errors';

export class Id implements ValueObject {
  private _id: string;

  constructor (id?: string) {
    if (id) {
      this.validate(id);
    }
    this._id = id || uuidv4();
  }

  getValue (): string {
    return this._id;
  }

  private validate (id: string): void {
    const isValid = validateUuid(id);
    if (!isValid) {
      throw new DomainError('Id');
    }
  }
}
