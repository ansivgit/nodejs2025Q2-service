import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
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
