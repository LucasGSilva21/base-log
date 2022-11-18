import { ErrorBase } from '@shared/domain/protocols';

export class InvalidUserNameError extends Error implements ErrorBase {
  readonly type: string;

  constructor (userName: string) {
    super(`The user name "${userName}" is invalid`);
    this.type = 'errors/authentication/invalidUserName';
    this.name = 'Invalid User Name';
  }
}
