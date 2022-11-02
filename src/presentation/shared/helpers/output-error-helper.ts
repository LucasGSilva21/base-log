import { badRequest, serverError } from '@presentation/shared/helpers';
import { HttpError } from '@presentation/shared/protocols';

export const makeOutputErrorHelper = (error: Error): HttpError => {
  if (error.name === 'errors/presentation/invalidParameters') {
    return badRequest(error);
  }

  return serverError();
};
