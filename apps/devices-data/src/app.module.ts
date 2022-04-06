import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as typeormConfig } from './database/typeorm.config';
import { DeviceDataModule } from './device-data/device-data.module';
import { DeviceData } from './device-data/entities/device-data.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeormConfig,
      entities: [DeviceData],
    } as TypeOrmModuleOptions),
    DeviceDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
