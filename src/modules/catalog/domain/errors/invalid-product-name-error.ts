import { ErrorBase } from '@shared/domain/protocols';

export class InvalidProductNameError extends Error implements ErrorBase {
  readonly type: string;

  constructor (productName: string) {
    super(`The product name "${productName}" is invalid`);
    this.type = 'errors/catalog/invalidProductName';
    this.name = 'Invalid Product Name';
  }
}
