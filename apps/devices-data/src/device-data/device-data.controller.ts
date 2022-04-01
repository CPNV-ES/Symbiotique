import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DeviceDataService } from './device-data.service';
import { CreateDeviceDataDto } from './dto/create-device-data.dto';

@Controller('device-data')
export class DeviceDataController {
  constructor(private readonly deviceDataService: DeviceDataService) {}

  @Post()
  create(@Body() createDeviceDatumDto: CreateDeviceDataDto) {
    return this.deviceDataService.create(createDeviceDatumDto);
  }

  @Get('/:clientId/temperature-average')
  temperatureAverage(@Param('clientId') clientId: string) {
    return this.deviceDataService.temperatureAverage();
  }
  @Get('/:clientId/humidity-average')
  humidityAverage(@Param('clientId') clientId: string) {
    return this.deviceDataService.humidityAverage();
  }
}
