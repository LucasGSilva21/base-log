import { UseCase } from '@shared/application/protocols';
import { SignInInputDto, SignInOutputDto } from '@authentication/application/dtos';
import { HttpRequest } from '@shared/presentation/protocols';
import { SignInController } from '@authentication/presentation/controllers';
import { SignInValidation } from '@authentication/presentation/validations';
import { ok, serverError } from '@shared/presentation/utils';
import { mockSignInInput } from '@tests/utils/mocks/dtos/authentication';
import { mockSignInUseCase } from '@tests/utils/mocks/usecases/authentication';
import { mockSignInValidation } from '@tests/utils/mocks/validations/authentication';
import { throwError } from '@tests/utils/utils';
import MockDate from 'mockdate';

jest.mock('uuid', () => ({
  v4 (): string {
    return 'valid-uuid';
  },

  validate (): boolean {
    return true;
  }
}));

interface SutTypes {
  sut: SignInController
  signInValidationStub: SignInValidation
  signInUseCaseStub: UseCase<SignInInputDto, SignInOutputDto>
}

const mockRequest = (): HttpRequest<SignInInputDto> => {
  return {
    body: mockSignInInput()
  };
};

const makeSut = (): SutTypes => {
  const signInUseCaseStub = mockSignInUseCase();
  const signInValidationStub = mockSignInValidation();
  const sut = new SignInController(signInUseCaseStub, signInValidationStub);

  return {
    sut,
    signInValidationStub,
    signInUseCaseStub
  };
};

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SignInUseCase with correct values', async () => {
    const { sut, signInUseCaseStub } = makeSut();
    const usecaseSpy = jest.spyOn(signInUseCaseStub, 'exec');
    await sut.handler(mockRequest());
    expect(usecaseSpy).toHaveBeenCalledWith(mockSignInInput());
  });

  test('Should call SignInValidation with correct values', async () => {
    const { sut, signInValidationStub } = makeSut();
    const validationSpy = jest.spyOn(signInValidationStub, 'validate');
    await sut.handler(mockRequest());
    expect(validationSpy).toHaveBeenCalledWith(mockSignInInput());
  });

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handler(mockRequest());
    expect(httpResponse).toEqual(ok({ accessToken: 'valid-token' }));
  });

  test('Should return 500 if SignInUseCase throws', async () => {
    const { sut, signInUseCaseStub } = makeSut();
    jest.spyOn(signInUseCaseStub, 'exec').mockImplementationOnce(throwError);
    const httpResponse = await sut.handler(mockRequest());
    expect(httpResponse).toEqual(serverError());
  });
});
