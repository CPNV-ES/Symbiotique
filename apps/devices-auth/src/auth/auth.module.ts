import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from './entities/crediential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
