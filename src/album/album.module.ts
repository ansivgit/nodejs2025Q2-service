import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Album } from './entities/album.entity';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  controllers: [AlbumController],
  providers: [AlbumRepository, AlbumService],
  exports: [AlbumRepository, AlbumService],
})
export class AlbumModule {}
