import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as typeormConfig } from './database/typeorm.config';
import { DeviceDataModule } from './device-data/device-data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeormConfig,
    }),
    DeviceDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
