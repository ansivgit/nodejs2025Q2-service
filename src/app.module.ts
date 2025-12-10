import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessGuard } from './auth/guards/jwt-access.guard';
import 'dotenv/config';

import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { FavsModule } from './favs/favs.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
  ],
})
export class AppModule {}
