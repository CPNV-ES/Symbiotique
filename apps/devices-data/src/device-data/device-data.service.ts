import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceDataDto } from './dto/create-device-data.dto';
import { DeviceData } from './entities/device-data.entity';

@Injectable()
export class DeviceDataService {
  constructor(
    @InjectRepository(DeviceData)
    private readonly devicesDataRepository: Repository<DeviceData>,
  ) {}

  create(createDeviceDataDto: CreateDeviceDataDto) {
    const deviceData = this.devicesDataRepository.create(createDeviceDataDto);
    console.log(createDeviceDataDto);
    return this.devicesDataRepository.save(deviceData);
  }

  async temperatureAverage() {
    const average = await this.devicesDataRepository
      .createQueryBuilder()
      .select(
        `time_bucket('5 minutes', time) AS timestamp, avg(temperature) AS temperature_average`,
      )
      .groupBy('timestamp')
      .getRawMany();

    return average;
  }
}
