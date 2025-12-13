import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    return await this.artistService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return await this.artistService.getOneById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.artistService.remove(id);
  }
}
