import { ErrorBase } from '@domain/protocols';
import { badRequest, serverError } from '@presentation/utils';
import { HttpResponse, OutputError } from '@presentation/protocols';

export const makeOutputErrorHelper = (error: ErrorBase): HttpResponse<OutputError> => {
  if (error.type === 'errors/common/invalidParameters') {
    return badRequest(error);
  }

  return serverError();
};
