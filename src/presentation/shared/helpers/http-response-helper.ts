import { HttpResponse, HttpError } from '@presentation/shared/protocols';

export const ok = (data: any): HttpResponse<any> => ({
  statusCode: 200,
  body: data
});

export const created = (data: any): HttpResponse<any> => ({
  statusCode: 201,
  body: data
});

export const noContent = (): HttpResponse<any> => ({
  statusCode: 204,
  body: null
});

export const badRequest = (error: Error): HttpError => ({
  statusCode: 400,
  body: error
});

export const notFound = (error: Error): HttpError => ({
  statusCode: 404,
  body: error
});

export const serverError = (): HttpError => ({
  statusCode: 500,
  body: 'Unexpected Error'
});
