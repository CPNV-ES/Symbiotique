import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    const device = new Device();
    device.clientId = createDeviceDto.clientId;
    device.state = createDeviceDto.state;

    return this.devicesRepository.save(device);
  }

  async findAll() {
    return await this.devicesRepository.find();
  }

  async findOneByClientId(clientId: string) {
    const device = await this.devicesRepository.findOne({
      where: {
        clientId,
      },
    });

    return device;
  }

  update(clientId: string, updateDeviceDto: UpdateDeviceDto) {
    return this.devicesRepository.update(clientId, updateDeviceDto);
  }

  remove(clientId: string) {
    return this.devicesRepository.delete(clientId);
  }
}
