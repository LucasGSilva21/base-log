export interface Validation<Input> {
  validate (input: Input): Promise<void>
}
