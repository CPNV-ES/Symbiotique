import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // This is the name of the service inside the docker-compose file, we
      // should load the module config from env variables.
      host: 'auth-db',
      port: 5432,
      username: 'auth',
      password: 'auth',
      database: 'auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
