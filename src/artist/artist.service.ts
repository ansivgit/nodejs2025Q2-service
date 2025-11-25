import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { DataBase } from 'src/db/db';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly db: DataBase,
    private readonly favsService: FavsService,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const entity = new Artist({ id: v4(), ...createArtistDto });

    if (!createArtistDto?.grammy) {
      entity.grammy = false;
    }
    this.db.artists.push(entity);

    return entity;
  }

  findAll(): Artist[] | [] {
    return this.db.artists;
  }

  findOne(id: string): Artist {
    const entity: Artist | undefined = this.db.artists.find(
      (entity) => entity.id === id,
    );

    if (!entity) {
      throw new NotFoundException('Person not found');
    }

    return entity;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const entity = this.findOne(id);

    const newArtist = {
      id,
      name: updateArtistDto?.name || entity.name,
      grammy:
        typeof updateArtistDto?.grammy === 'boolean'
          ? updateArtistDto.grammy
          : entity.grammy,
    };

    return newArtist;
  }

  remove(id: string): void {
    const entity: Artist = this.findOne(id);

    const entityIndex = this.db.artists.findIndex(
      (person) => person.id === entity.id,
    );

    this.db.artists.splice(entityIndex, 1);

    const artistTracks = this.db.tracks.filter(
      (track) => track.artistId === entity.id,
    );
    artistTracks.forEach((track) => (track.artistId = null));

    const artistAlbums = this.db.albums.filter(
      (album) => album.artistId === entity.id,
    );
    artistAlbums.forEach((album) => (album.artistId = null));

    this.favsService.removeArtist(id);

    console.log(`This action removes a #${id} artist`);
  }
}
