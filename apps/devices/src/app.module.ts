import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // This is the name of the service inside the docker-compose file, we
      // should load the module config from env variables.
      host: 'devices-db',
      port: 5432,
      username: 'devices',
      password: 'devices',
      database: 'devices',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    DevicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
