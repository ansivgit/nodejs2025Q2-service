export type LogLevel = 0 | 1 | 2 | 3 | 4; //* error, warn, info, debug, verbose

export interface LoggerOptions {
  level?: string;
  filePath?: string;
  console?: boolean;
  maxLogFileSize?: number;
  maxBackupFiles?: number;
}

export interface RequestLog {
  method: string;
  url: string;
  query: any;
  body: any;
  ip: string;
  userAgent: string;
  timestamp: Date;
}

export interface ResponseLog {
  statusCode: number;
  contentLength: number;
  responseTime: number;
}
