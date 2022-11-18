import { ErrorBase } from '@shared/domain/protocols';

export class InvalidParameterError extends Error implements ErrorBase {
  readonly type: string;

  constructor (message: string) {
    super(message);
    this.type = 'errors/common/invalidParameter';
    this.name = 'Invalid Parameter';
  }
}
