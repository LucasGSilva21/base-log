import { ErrorBase } from '@domain/protocols';
import { badRequest, serverError } from '@presentation/utils';
import { HttpResponse, OutputError } from '@presentation/protocols';

export const makeOutputErrorHelper = (error: ErrorBase): HttpResponse<OutputError> => {
  // Domain Errors
  if (error.type === 'errors/authentication/invalidEmail') {
    return badRequest(error);
  }
  if (error.type === 'errors/common/invalidId') {
    return badRequest(error);
  }
  if (error.type === 'errors/authentication/invalidPassword') {
    return badRequest(error);
  }
  if (error.type === 'errors/authentication/invalidUserName') {
    return badRequest(error);
  }

  // Application Errors
  if (error.type === 'errors/authentication/duplicatedEmail') {
    return badRequest(error);
  }


  // Presentation Errors
  if (error.type === 'errors/common/invalidParameter') {
    return badRequest(error);
  }

  return serverError();
};
