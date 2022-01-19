import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'admin' })
  password: string;
}
