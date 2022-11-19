import { SignUpInputDto } from '@authentication/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  validate as validator
} from 'class-validator';

class SignUpValidationModel {
  @IsString()
  @IsNotEmpty()
    userName: string;

  @IsString()
  @IsNotEmpty()
    email: string;

  @IsString()
  @IsNotEmpty()
    password: string;

  @IsBoolean()
  @IsOptional()
    isActive?: boolean;
}

export class SignUpValidation implements Validation<SignUpInputDto> {
  async validate (input: SignUpInputDto): Promise<void> {
    const signUpValidate = new SignUpValidationModel();

    signUpValidate.userName = input.userName;
    signUpValidate.email = input.email;
    signUpValidate.password = input.password;
    signUpValidate.isActive = input.isActive;

    const errors = await validator(signUpValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
