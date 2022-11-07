import { HttpRequest, HttpResponse, OutputError } from '@presentation/protocols';

export interface Controller<R> {
  handler (httpRequest: HttpRequest): Promise<HttpResponse<R | OutputError>>
}
