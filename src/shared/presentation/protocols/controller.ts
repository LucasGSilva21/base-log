import { HttpRequest, HttpResponse, OutputError } from '@shared/presentation/protocols';

export interface Controller<R> {
  handler (httpRequest: HttpRequest): Promise<HttpResponse<R | OutputError>>
}
