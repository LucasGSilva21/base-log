import { ValueObject } from '@domain/shared/protocols';
import { InvalidUserNameError } from '@domain/shared/errors';
import { validateUserName } from '@domain/shared/helpers';

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
      throw new InvalidUserNameError(userName);
    }
  }
}
