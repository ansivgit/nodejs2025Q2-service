import { Module, DynamicModule, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerOptions } from './types/logger.type';
import { LOGGER_OPTIONS } from '../../constants';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options?: LoggerOptions): DynamicModule {
    const loggerOptions = options || {};

    return {
      module: LoggerModule,
      providers: [
        {
          provide: LOGGER_OPTIONS,
          useValue: loggerOptions,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
