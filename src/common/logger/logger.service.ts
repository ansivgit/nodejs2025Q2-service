import * as fs from 'node:fs';
import * as path from 'node:path';
import { Injectable, Scope, Inject, Optional } from '@nestjs/common';
import { LogLevel, LoggerOptions } from './types/logger.type';
import { LOGGER_OPTIONS } from '../../constants';

const KiB = 1024;
const defaultOptions: LoggerOptions = {
  level: 'info',
  filePath: 'app.log',
  console: false,
  maxLogFileSize: 1024,
  maxBackupFiles: 5,
};

@Injectable({ scope: Scope.DEFAULT })
export class LoggerService {
  private logLevel: LogLevel;
  private logToConsole: boolean;
  private logFilePath: string;
  private maxLogFileSize: number;
  private maxBackupFiles: number;
  private currentLogStream: fs.WriteStream | null = null;

  constructor(@Optional() @Inject(LOGGER_OPTIONS) options?: LoggerOptions) {
    const mergedOptions = { ...defaultOptions, ...options };

    this.logLevel = this.getLogLevelFromString(mergedOptions.level);
    this.logToConsole = mergedOptions.console;
    this.logFilePath = mergedOptions.filePath;
    this.maxLogFileSize = mergedOptions.maxLogFileSize;
    this.maxBackupFiles = mergedOptions.maxBackupFiles;

    if (this.logFilePath) {
      this.ensureLogDirectory();
      this.currentLogStream = this.createLogStream();
    }
  }

  private getLogLevelFromString(level: string): LogLevel {
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
      verbose: 4,
    };
    return levels[level.toLowerCase()] ?? levels[defaultOptions.level];
  }

  private ensureLogDirectory(): void {
    const dir = path.dirname(this.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private createLogStream(): fs.WriteStream {
    return fs.createWriteStream(this.logFilePath, { flags: 'a' });
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private rotateLogFile(): void {
    if (!this.currentLogStream) {
      return;
    }

    this.currentLogStream.end();
    this.currentLogStream = null;

    if (fs.existsSync(this.logFilePath)) {
      const stats = fs.statSync(this.logFilePath);
      const fileSizeKB = stats.size / KiB;

      if (fileSizeKB >= this.maxLogFileSize) {
        for (let i = this.maxBackupFiles - 1; i > 0; i--) {
          const oldFile = `${this.logFilePath}.${i}`;
          const newFile = `${this.logFilePath}.${i + 1}`;

          if (fs.existsSync(oldFile)) {
            if (fs.existsSync(newFile)) {
              fs.unlinkSync(newFile);
            }
            fs.renameSync(oldFile, newFile);
          }
        }

        fs.renameSync(this.logFilePath, `${this.logFilePath}.1`);
      }
    }

    this.currentLogStream = this.createLogStream();
  }

  private formatMessage(
    level: string,
    message: string,
    context?: string,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` [${context}]` : '';
    return `[${timestamp}] ${level.toUpperCase()}${contextStr}: ${message}\n`;
  }

  private writeLog(level: string, message: string, context?: string): void {
    if (!this.shouldLog(this.getLogLevelFromString(level))) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, context);

    if (this.logToConsole) {
      process.stdout.write(formattedMessage);
    }

    if (this.currentLogStream && this.logFilePath) {
      if (fs.existsSync(this.logFilePath)) {
        const stats = fs.statSync(this.logFilePath);
        const fileSizeKB = stats.size / KiB;

        if (fileSizeKB >= this.maxLogFileSize) {
          this.rotateLogFile();
        }
      }

      this.currentLogStream.write(formattedMessage);
    }
  }

  error(message: string, context?: string): void {
    this.writeLog('error', message, context);
  }

  warn(message: string, context?: string): void {
    this.writeLog('warn', message, context);
  }

  log(message: string, context?: string): void {
    this.writeLog('info', message, context);
  }

  info(message: string, context?: string): void {
    this.writeLog('info', message, context);
  }

  debug(message: string, context?: string): void {
    this.writeLog('debug', message, context);
  }

  verbose(message: string, context?: string): void {
    this.writeLog('verbose', message, context);
  }

  onModuleDestroy(): void {
    if (this.currentLogStream) {
      this.currentLogStream.end();
    }
  }
}
