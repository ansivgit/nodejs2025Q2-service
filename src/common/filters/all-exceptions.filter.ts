import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { Request, Response } from 'express';

import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Unknown error';

    this.loggerService.error(
      `${request.method} ${request.url} - ${status} - ${JSON.stringify(message)}`,
      'ExceptionFilter',
    );

    if (exception instanceof Error) {
      this.loggerService.error(
        `Error: ${exception.message}\nStack: ${exception.stack}`,
        'ExceptionFilter',
      );
    }

    const responseBody = {
      statusCode: status,
      // timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
      message:
        typeof message === 'string'
          ? message
          : (message as HttpException).message || 'Internal server error',
    };

    httpAdapter.reply(response, responseBody, status);
  }
}
