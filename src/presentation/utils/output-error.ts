import { ErrorBase } from '@domain/protocols';
import { badRequest, serverError } from '@presentation/utils';
import { HttpResponse, OutputError } from '@presentation/protocols';

export const makeOutputErrorHelper = (error: ErrorBase): HttpResponse<OutputError> => {
  // Domain Errors
  if (error.type === 'errors/common/invalidEmail') {
    return badRequest(error);
  }
  if (error.type === 'errors/common/invalidId') {
    return badRequest(error);
  }
  if (error.type === 'errors/common/invalidPassword') {
    return badRequest(error);
  }
  if (error.type === 'errors/common/invalidUserName') {
    return badRequest(error);
  }

  // Application Errors
  if (error.type === 'errors/common/duplicatedEmail') {
    return badRequest(error);
  }


  // Presentation Errors
  if (error.type === 'errors/common/invalidParameter') {
    return badRequest(error);
  }

  return serverError();
};
