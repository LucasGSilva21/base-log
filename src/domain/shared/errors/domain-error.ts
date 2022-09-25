export class DomainError extends Error {
  constructor (paramName: string) {
    super(`DomainError: The field ${paramName} is invalid`)
    this.name = 'DomainError'
  }
}
