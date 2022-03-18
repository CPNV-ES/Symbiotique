import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      clientId: 'devices',
      username: 'devices',
      password: 'devices',
      url: 'mqtt://broker:1883',
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Devices API')
    .setDescription('Devices API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
