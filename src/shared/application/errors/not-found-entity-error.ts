import { ErrorBase } from '@shared/domain/protocols';

export class NotFoundEntityError extends Error implements ErrorBase {
  readonly type: string;

  constructor (id: string) {
    super(`Not found entity with id "${id}"`);
    this.type = 'errors/common/notFoundEntity';
    this.name = 'Not Found Entity';
  }
}
