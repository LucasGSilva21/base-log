import { HttpRequest, HttpResponse, HttpError } from '@presentation/shared/protocols';

export interface Controller<R> {
  handle (httpRequest: HttpRequest): Promise<HttpResponse<R>| HttpError>
}
