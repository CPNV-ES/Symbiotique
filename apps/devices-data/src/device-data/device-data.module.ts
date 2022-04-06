import { Module } from '@nestjs/common';
import { DeviceDataService } from './device-data.service';
import { DeviceDataController } from './device-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceData } from './entities/device-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceData])],
  controllers: [DeviceDataController],
  providers: [DeviceDataService],
})
export class DeviceDataModule {}
