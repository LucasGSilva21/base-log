import { OutputError } from '@presentation/shared/protocols';

export interface HttpRequest {
  body?: any
  headers?: any
  params?: any
}

export interface HttpResponse<B> {
  statusCode: number
  body?: B | OutputError
}