import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Favs } from './entities/favs.entity';
import { FavsController } from './favs.controller';
import { FavsRepository } from './favs.repository';
import { FavsService } from './favs.service';

import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favs]),
    AlbumModule,
    ArtistModule,
    TrackModule,
  ],
  controllers: [FavsController],
  providers: [FavsRepository, FavsService],
  exports: [FavsService],
})
export class FavsModule {}
