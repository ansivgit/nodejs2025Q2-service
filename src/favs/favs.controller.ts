import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';

import { FavsService } from './favs.service';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favs } from 'src/favs/entities/favs.entity';
import { Track } from 'src/track/entities/track.entity';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll(): Favs {
    return this.favsService.findAll();
  }

  @Post('album/:id')
  @HttpCode(201)
  createAlbum(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.favsService.createAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  createArtist(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.favsService.createArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeArtist(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  createTrack(@Param('id', ParseUUIDPipe) id: string): Track {
    return this.favsService.createTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeTrack(id);
  }
}
