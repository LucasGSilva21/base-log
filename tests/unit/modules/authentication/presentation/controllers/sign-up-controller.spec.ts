import { UseCase } from '@shared/application/protocols';
import { SignUpInputDto, SignUpOutputDto } from '@authentication/application/dtos';
import { HttpRequest, Validation } from '@shared/presentation/protocols';
import { SignUpController } from '@authentication/presentation/controllers';
import { SignUpValidation } from '@authentication/presentation/validations';
import { created, serverError } from '@shared/presentation/utils';
import { mockCreateAccount } from '@tests/utils/mocks/entities';
import { mockSignUpInput } from '@tests/utils/mocks/dtos/authentication';
import { mockSignUpUseCase } from '@tests/utils/mocks/usecases/authentication';
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
  sut: SignUpController
  signUpValidationStub: Validation<SignUpInputDto>
  signUpUseCaseStub: UseCase<SignUpInputDto, SignUpOutputDto>
}

const mockRequest = (): HttpRequest<SignUpInputDto> => {
  return {
    body: mockSignUpInput()
  };
};

const makeSut = (): SutTypes => {
  const signUpUseCaseStub = mockSignUpUseCase();
  const signUpValidationStub = new SignUpValidation();
  const sut = new SignUpController(signUpUseCaseStub, signUpValidationStub);

  return {
    sut,
    signUpValidationStub,
    signUpUseCaseStub
  };
};

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SignUpUseCase with correct values', async () => {
    const { sut, signUpUseCaseStub } = makeSut();
    const usecaseSpy = jest.spyOn(signUpUseCaseStub, 'exec');
    await sut.handler(mockRequest());
    expect(usecaseSpy).toHaveBeenCalledWith(mockSignUpInput());
  });

  test('Should call SignUpValidation with correct values', async () => {
    const { sut, signUpValidationStub } = makeSut();
    const validationSpy = jest.spyOn(signUpValidationStub, 'validate');
    await sut.handler(mockRequest());
    expect(validationSpy).toHaveBeenCalledWith(mockSignUpInput());
  });

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handler(mockRequest());
    expect(httpResponse).toEqual(created(mockCreateAccount().mapperToPrimitives()));
  });

  test('Should return 500 if SignUpUseCase throws', async () => {
    const { sut, signUpUseCaseStub } = makeSut();
    jest.spyOn(signUpUseCaseStub, 'exec').mockImplementationOnce(throwError);
    const httpResponse = await sut.handler(mockRequest());
    expect(httpResponse).toEqual(serverError());
  });
});
