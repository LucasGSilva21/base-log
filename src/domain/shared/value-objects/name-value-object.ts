import { ValueObject } from '../protocols';
import { DomainError } from '../errors';
import { onlyLettersAndSpaces } from '../helpers';

export class Name implements ValueObject<string> {
  private _name: string;

  constructor(name: string) {
    this.validate(name);
    this._name = name;
  }

  getValue(): string {
    return this._name;
  }

  private validate(name: string): void {
    const isValid = onlyLettersAndSpaces(name);
    if (!isValid) {
      throw new DomainError('Name');
    }
  }
}
