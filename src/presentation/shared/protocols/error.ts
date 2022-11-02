export interface ErrorBase {
  type: string
  name: string
  message: string
}

export interface OutputError {
  error: {
    type: string
    title: string
    message: string
  }
}
