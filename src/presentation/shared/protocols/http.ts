export type HttpRequest = {
  body?: any
  headers?: any
  params?: any
}

export type HttpResponse<B> = {
  statusCode: number
  body?: B
}
