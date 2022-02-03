import { DeviceState } from '../device.entity';

export class CreateDeviceDto {
  readonly clientId: string;

  readonly state: DeviceState;
}
