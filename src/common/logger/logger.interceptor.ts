import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Request } from 'express';

import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { method, url, query, body, ip } = request;
    const userAgent = request.get('user-agent') || '';

    const now = Date.now();

    this.loggerService.log(
      `Request: ${method} ${url} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)} - IP: ${ip} - UserAgent: ${userAgent}`,
      'Request',
    );

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
          const responseTime = Date.now() - now;

          this.loggerService.log(
            `Response: ${method} ${url} - Status: ${statusCode} - Time: ${responseTime}ms`,
            'Response',
          );
        },
        error: (error) => {
          const responseTime = Date.now() - now;

          this.loggerService.error(
            `Request ${method} ${url} failed after ${responseTime}ms - Error: ${error.message}`,
            'RequestError',
          );
        },
      }),
    );
  }
}
