import { ValueObject } from '@domain/shared/protocols';
import { InvalidUserNameError } from '@domain/shared/errors';
import { validateUserName } from '@domain/shared/helpers';

export class UserName implements ValueObject<string> {
  private _userName: string;

  private constructor(userName: string) {
    this._userName = userName;
  }

  private static createOrLoad(userName: string): UserName {
    const isValid = this.validate(userName);
    if (!isValid) {
      throw new InvalidUserNameError(userName);
    }
    return new UserName(userName);
  }

  static create(userName: string): UserName {
    return this.createOrLoad(userName);
  }

  static load(userName: string): UserName {
    return this.createOrLoad(userName);
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
