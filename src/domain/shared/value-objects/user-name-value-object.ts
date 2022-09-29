import { ValueObject } from '../protocols';
import { DomainError } from '../errors';
import { validateUserName } from '../helpers';

export class UserName implements ValueObject<string> {
  private _userName: string;

  constructor(userName: string) {
    this.validate(userName);
    this._userName = userName;
  }

  getValue(): string {
    return this._userName;
  }

  private validate(userName: string): void {
    const isValid = validateUserName(userName);
    if (!isValid) {
      throw new DomainError(`The user name ${userName} is invalid`);
    }
  }
}
