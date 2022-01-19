import { MinLength } from 'class-validator';

export class SignInDto {
  username: string;

  @MinLength(8)
  password: string;
}
