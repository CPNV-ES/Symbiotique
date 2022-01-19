import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'admin' })
  username: string;

  @MinLength(8)
  @ApiProperty({ example: 'admin' })
  password: string;
}
