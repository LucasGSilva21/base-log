import { ErrorBase } from '@shared/domain/protocols';

export class InvalidCredentialsError extends Error implements ErrorBase {
  readonly type: string;

  constructor () {
    super('The credentials provided are invalid');
    this.type = 'errors/authentication/invalidCredentials';
    this.name = 'Invalid Credentials';
  }
}
