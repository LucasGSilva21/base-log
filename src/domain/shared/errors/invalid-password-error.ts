import { ErrorBase } from '@domain/shared/protocols';

export class InvalidPasswordError extends Error implements ErrorBase {
  readonly type: string;

  constructor () {
    super('The password provided is invalid');
    this.type = 'errors/authentication/invalidPassword';
    this.name = 'Invalid Password';
  }
}
