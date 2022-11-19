import { HttpRequest, HttpResponse, OutputError } from '@shared/presentation/protocols';

export interface Controller<Request, Response> {
  handler (httpRequest: HttpRequest<Request>): Promise<HttpResponse<Response | OutputError>>
}
