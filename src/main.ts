import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
// import * as dotenv from 'dotenv';
import 'dotenv/config';

import { AppModule } from './app.module';
import { getSwaggerDoc } from './utils';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDoc = await getSwaggerDoc();
  SwaggerModule.setup('doc', app, swaggerDoc);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
