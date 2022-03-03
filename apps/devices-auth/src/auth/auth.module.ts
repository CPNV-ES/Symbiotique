import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Credential } from './entities/crediential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credential]),
    ClientsModule.register([
      {
        name: 'BROKER',
        transport: Transport.MQTT,
        options: { url: 'mqtt://broker:1883' },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
