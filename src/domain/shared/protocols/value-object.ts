export interface ValueObject {
  validate (value: any): void
  getValue (): any
}
