import { PartialType } from '@nestjs/swagger';
import { CreateDeviceDataDto } from './create-device-data.dto';

export class UpdateDeviceDataDto extends PartialType(CreateDeviceDataDto) {}
