import { badRequest, serverError } from '@presentation/shared/helpers';
import { HttpResponse } from '@presentation/shared/protocols';

export const makeOutputErrorHelper = (error: Error): HttpResponse<string> => {
  if (error.name === 'errors/presentation/invalidParameters') {
    return badRequest(error);
  }

  return serverError();
};
