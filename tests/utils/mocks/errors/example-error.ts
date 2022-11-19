import { ErrorBase } from '@shared/domain/protocols';

export class ExampleError extends Error implements ErrorBase {
  readonly type: string;

  constructor () {
    super('Example Message');
    this.type = 'errors/common/example';
    this.name = 'Example Error';
  }
}
