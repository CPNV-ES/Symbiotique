import { MinLength } from 'class-validator';

export class SignInDto {
  name: string;

  @MinLength(8)
  password: string;
}
