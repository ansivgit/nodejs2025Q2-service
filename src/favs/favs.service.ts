import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { Favs } from './entities/favs.entity';

import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { TrackRepository } from '../track/track.repository';
import { FavsRepository } from './favs.repository';

@Injectable()
export class FavsService {
  constructor(
    private readonly favsRepository: FavsRepository,
    private albumRepository: AlbumRepository,
    private artistRepository: ArtistRepository,
    private trackRepository: TrackRepository,
  ) {}

  async getAll(): Promise<Favs> {
    return await this.favsRepository.getAll();
  }

  async addToFavs(favsType: keyof Omit<Favs, 'id'>, id: string): Promise<Favs> {
    let entity: Album | Artist | Track | null = null;

    switch (favsType) {
      case 'albums':
        entity = await this.albumRepository.getOne(id);
        break;
      case 'artists':
        entity = await this.artistRepository.getOne(id);
        break;
      case 'tracks':
        entity = await this.trackRepository.getOne(id);
        break;
      default:
        console.error('Invalid favsType');
        entity = null;
    }

    if (!entity) {
      throw new UnprocessableEntityException("Item doesn't exist");
    }

    await this.favsRepository.add(favsType, entity);
    return await this.getAll();
  }

  async removeFromFavs<K extends keyof Omit<Favs, 'id'>>(
    favsType: K,
    id: string,
  ): Promise<void> {
    const favs: Favs = await this.favsRepository.getAll();

    const newFavsArr = favs[favsType].filter(
      (ent: Album | Artist | Track) => ent.id !== id,
    );
    favs[favsType] = newFavsArr as Favs[K];

    await this.favsRepository.update(favs);
  }
}
