export interface UseCase<Input, Output> {
  exec (data?: Input): Promise<Output>
}
