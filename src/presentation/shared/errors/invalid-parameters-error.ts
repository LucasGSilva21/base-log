export class InvalidParamsError extends Error {
  constructor (errors: any) {
    super('Invalid Parameters Error');
    this.name = 'errors/presentation/invalidParameters';
    this.message = errors;
  }
}
