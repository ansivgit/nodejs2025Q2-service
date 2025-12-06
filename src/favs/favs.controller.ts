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
import { Favs } from 'src/favs/entities/favs.entity';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll(): Promise<Favs> {
    return await this.favsService.getAll();
  }

  @Post('album/:id')
  @HttpCode(201)
  async createAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Favs> {
    return await this.favsService.addToFavs('albums', id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.removeFromFavs('albums', id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async createArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Favs> {
    return await this.favsService.addToFavs('artists', id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.removeFromFavs('artists', id);
  }

  @Post('track/:id')
  @HttpCode(201)
  async createTrack(@Param('id', ParseUUIDPipe) id: string): Promise<Favs> {
    return await this.favsService.addToFavs('tracks', id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.removeFromFavs('tracks', id);
  }
}
