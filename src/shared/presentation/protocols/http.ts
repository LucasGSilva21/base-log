import { OutputError } from '@shared/presentation/protocols';

export interface HttpRequest<B> {
  body?: B
  headers?: any
  params?: any
  query?: any
}

export interface HttpResponse<B> {
  statusCode: number
  body?: B | OutputError
}
