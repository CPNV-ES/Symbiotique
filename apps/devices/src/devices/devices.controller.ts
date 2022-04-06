import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { Device, DeviceState } from './device.entity';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register a new device',
    type: Device,
  })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all devices',
    type: [Device],
  })
  async findAll() {
    return await this.devicesService.findAll();
  }

  @Get(':clientId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get device by client id',
    type: Device,
  })
  findOne(@Param('clientId') clientId: string) {
    return this.devicesService.findOneByClientId(clientId);
  }

  @Patch(':clientId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update device by client id',
    type: Device,
  })
  update(
    @Param('clientId') clientId: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(clientId, updateDeviceDto);
  }

  @Delete(':clientId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete device by client id',
  })
  remove(@Param('clientId') clientId: string) {
    return this.devicesService.remove(clientId);
  }

  @MessagePattern('v1/devices/auth-success')
  async deviceAuthSuccess(@Body() body) {
    const { clientId } = body;
    const device = await this.devicesService.findOneByClientId(clientId);

    if (!device) {
      this.devicesService.create({
        clientId,
        state: DeviceState.NOT_CONFIGURED,
      });
    }
  }

  @MessagePattern('v1/devices/auth-failure')
  async deviceAuthFailure(@Body() body) {
    const { clientId } = body;

    await this.devicesService.update(clientId, {
      clientId,
      state: DeviceState.AUTHENTICATION_FAILED,
    });
  }
}
