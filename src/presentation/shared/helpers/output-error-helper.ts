import { badRequest, serverError } from '@presentation/shared/helpers';
import { HttpResponse, ErrorBase, OutputError } from '@presentation/shared/protocols';

export const makeOutputErrorHelper = (error: ErrorBase): HttpResponse<OutputError> => {
  if (error.name === 'errors/common/invalidParameters') {
    return badRequest(error);
  }

  return serverError();
};
