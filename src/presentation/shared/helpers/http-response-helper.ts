import { HttpResponse } from '@presentation/shared/protocols';

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

export const badRequest = (error: Error): HttpResponse<any> => ({
  statusCode: 400,
  body: error
});

export const notFound = (error: Error): HttpResponse<any> => ({
  statusCode: 404,
  body: error
});

export const serverError = (): HttpResponse<any> => ({
  statusCode: 500,
  body: 'Unexpected Error'
});
