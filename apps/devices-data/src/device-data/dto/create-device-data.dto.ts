import { IsDateString, IsDecimal, IsString } from 'class-validator';

export class CreateDeviceDataDto {
  @IsDateString()
  time: Date;

  @IsString()
  clientId: string;

  @IsString()
  location: string;

  @IsDecimal()
  temperature: number;

  @IsDecimal()
  humidity: number;
}
