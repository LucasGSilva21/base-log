import { ValueObject } from '@shared/domain/protocols';
import { hasNumber } from '@shared/domain/utils';
import { InvalidUserNameError } from '@authentication/domain/errors';

export class UserName implements ValueObject<string> {
  private _userName: string;

  private constructor (userName: string) {
    this._userName = userName;
  }

  static create (userName: string): UserName {
    const isValid = this.validate(userName);
    if (!isValid) {
      throw new InvalidUserNameError(userName);
    }
    return new UserName(userName);
  }

  getValue (): string {
    return this._userName;
  }

  static validate (userName: string): boolean {
    if (
      !userName ||
      !userName.trim() ||
      userName.trim().length > 255 ||
      hasNumber.test(userName)
    ) {
      return false;
    }
    return true;
  }
}
