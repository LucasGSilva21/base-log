import { ValueObject } from '@shared/domain/protocols';
import { InvalidUserNameError } from '@authentication/domain/errors';
import { validateUserName } from '@authentication/domain/validators';

export class UserName implements ValueObject<string> {
  private _userName: string;

  private constructor(userName: string) {
    this._userName = userName;
  }

  static create(userName: string): UserName {
    const isValid = this.validate(userName);
    if (!isValid) {
      throw new InvalidUserNameError(userName);
    }
    return new UserName(userName);
  }

  getValue(): string {
    return this._userName;
  }

  static validate(userName: string): boolean {
    const isValid = validateUserName(userName);
    if (!isValid) {
      return false;
    }
    return true;
  }
}
