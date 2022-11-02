import { ErrorBase } from '@presentation/shared/protocols';

export class InvalidParametersError extends Error implements ErrorBase {
  readonly type: string;

  constructor (error: Error) {
    super('Invalid Parameters Error');
    this.type = 'errors/common/invalidParameters';
    this.message = error.message;
  }
}
