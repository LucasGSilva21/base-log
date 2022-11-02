import { ErrorBase } from '@domain/shared/protocols';
import { badRequest, serverError } from '@presentation/shared/helpers';
import { HttpResponse, OutputError } from '@presentation/shared/protocols';

export const makeOutputErrorHelper = (error: ErrorBase): HttpResponse<OutputError> => {
  if (error.type === 'errors/common/invalidParameters') {
    return badRequest(error);
  }

  return serverError();
};
