import { ErrorBase } from '@domain/protocols';

export class InvalidPasswordError extends Error implements ErrorBase {
  readonly type: string;

  constructor () {
    super('The password provided is invalid');
    this.type = 'errors/authentication/invalidPassword';
    this.name = 'Invalid Password';
  }
}
