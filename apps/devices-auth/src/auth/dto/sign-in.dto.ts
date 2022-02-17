import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'device' })
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'device' })
  password: string;
}
