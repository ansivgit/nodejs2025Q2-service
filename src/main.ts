import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

import { AppModule } from './app.module';
import { LoggerInterceptor } from './common/logger/logger.interceptor';
import { LoggerService } from './common/logger/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { getSwaggerDoc } from './utils';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = await app.resolve(LoggerService);

  const swaggerDoc = await getSwaggerDoc();
  SwaggerModule.setup('doc', app, swaggerDoc);
  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));
  app.useGlobalInterceptors(new LoggerInterceptor(logger));

  await app.listen(PORT);
  logger.log(
    `Application is running on: http://localhost:${PORT}`,
    'Bootstrap',
  );

  process.on('uncaughtException', (error) => {
    logger.log(`Uncaught Exception: ${error.message}`, 'Process');
    logger.error(error.stack, 'Process');
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.log(`Unhandled Rejection at: ${promise}`, 'Process');
    logger.error(`Reason: ${reason}`, 'Process');
  });
}

bootstrap();
