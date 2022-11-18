import { ErrorBase } from '@shared/domain/protocols';
import { HttpResponse, OutputError } from '@authentication/presentation/protocols';

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

export const badRequest = (error: ErrorBase): HttpResponse<OutputError> => ({
  statusCode: 400,
  body: {
    error: {
      type: error.type,
      title: error.name,
      message: error.message
    }
  }
});

export const notFound = (error: ErrorBase): HttpResponse<OutputError> => ({
  statusCode: 404,
  body: {
    error: {
      type: error.type,
      title: error.name,
      message: error.message
    }
  }
});

export const serverError = (): HttpResponse<OutputError> => ({
  statusCode: 500,
  body: {
    error: {
      type: 'errors/common/unexpectedError',
      title: 'Unexpected Error',
      message: 'Please, try again later'
    }
  }
});
