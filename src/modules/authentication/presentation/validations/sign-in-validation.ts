import { SignInInputDto } from '@authentication/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class SignInValidationModel {
  @IsString()
  @IsNotEmpty()
    email: string;

  @IsString()
  @IsNotEmpty()
    password: string;
}

export class SignInValidation implements Validation<SignInInputDto> {
  async validate (input: SignInInputDto): Promise<void> {
    const signInValidate = new SignInValidationModel();

    signInValidate.email = input.email;
    signInValidate.password = input.password;

    const errors = await validator(signInValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
