import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { FavsModule } from './favs/favs.module';
import { LoggerModule } from './common/logger/logger.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      level: process.env.LOG_LEVEL || 'info',
      filePath: process.env.LOG_FILE_PATH || 'logs/app.log',
      console: process.env.LOG_CONSOLE !== 'false',
      maxLogFileSize: parseInt(process.env.LOG_MAX_FILE_SIZE_KB) || 1024,
      maxBackupFiles: parseInt(process.env.LOG_MAX_BACKUP_FILES) || 5,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NODE_ENV === 'development' ? 'localhost' : 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
      // logging: ['query', 'error'], //! SQL logs
      // logger: 'advanced-console',
      // maxQueryExecutionTime: 1000,
    }),

    AuthModule,
    AlbumModule,
    ArtistModule,
    FavsModule,
    TrackModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
