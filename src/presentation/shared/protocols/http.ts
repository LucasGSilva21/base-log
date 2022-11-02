export interface HttpRequest {
  body?: any
  headers?: any
  params?: any
}

export interface HttpResponse<B> {
  statusCode: number
  body?: B
}

export interface HttpError {
  statusCode: number
  body: string | Error
}
