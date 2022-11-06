import { HttpRequest, HttpResponse, OutputError } from '@presentation/protocols';

export interface Controller<R> {
  handle (httpRequest: HttpRequest): Promise<HttpResponse<R | OutputError>>
}
