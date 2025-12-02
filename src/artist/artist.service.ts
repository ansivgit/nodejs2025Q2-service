import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Artist } from './entities/artist.entity';
import { ArtistRepository } from './artist.repository';
// import { FavsService } from 'src/favs/favs.service';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    // private readonly favsService: FavsService,
  ) {}

  private async getEntity(id: string): Promise<Artist> {
    const entity: Artist | null = await this.artistRepository.getOne(id);

    if (!entity) {
      throw new NotFoundException('Artist not found');
    }

    return entity;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const entity: Artist = new Artist({ id: v4(), ...createArtistDto });

    if (!createArtistDto?.grammy) {
      entity.grammy = false;
    }

    await this.artistRepository.create(entity);
    return entity;
  }

  async getAll(): Promise<Artist[]> {
    return await this.artistRepository.getAll();
  }

  async getOneById(id: string): Promise<Artist> {
    return await this.getEntity(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const entity: Artist = await this.getEntity(id);

    Object.assign(entity, updateArtistDto);
    await this.artistRepository.update(entity);

    return entity;
  }

  async remove(id: string): Promise<void> {
    await this.getEntity(id);

    await this.artistRepository.remove(id);
    console.log(`This action removes a #${id} artist`);

    // const artistTracks = this.db.tracks.filter(
    //   (track) => track.artistId === entity.id,
    // );
    // artistTracks.forEach((track) => (track.artistId = null));

    // const artistAlbums = this.db.albums.filter(
    //   (album) => album.artistId === entity.id,
    // );
    // artistAlbums.forEach((album) => (album.artistId = null));

    // this.favsService.removeArtist(id);
  }
}
