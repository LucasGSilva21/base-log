import { UseCase } from '@authentication/application/protocols';
import { SignUpInputDto, SignUpOutputDto } from '@authentication/application/dtos';
import { HttpRequest } from '@authentication/presentation/protocols';
import { SignUpController } from '@authentication/presentation/controllers';
import { created, serverError } from '@authentication/presentation/utils';
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
  signUpUseCaseStub: UseCase<SignUpInputDto, SignUpOutputDto>
}

const mockRequest = (): HttpRequest => {
  return {
    body: mockSignUpInput()
  };
};

const makeSut = (): SutTypes => {
  const signUpUseCaseStub = mockSignUpUseCase();
  const sut = new SignUpController(signUpUseCaseStub);

  return {
    sut,
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
