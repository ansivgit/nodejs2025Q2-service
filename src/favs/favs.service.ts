import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { DataBase } from 'src/db/db';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

import { Favs } from './entities/favs.entity';

@Injectable()
export class FavsService {
  constructor(private readonly db: DataBase) {}

  findAll(): Favs {
    const albums: Album[] = this.db.favs.albums;
    const artists: Artist[] = this.db.favs.artists;
    const tracks: Track[] = this.db.favs.tracks;

    const res: Favs = { artists, albums, tracks };

    return res;
  }

  createAlbum(id: string): Album {
    const album: Album | undefined = this.db.albums.find(
      (entity) => entity.id === id,
    );

    if (!album) {
      throw new UnprocessableEntityException("Item doesn't exist");
    }

    this.db.favs.albums.push(album);
    return album;
  }

  removeAlbum(id: string): void {
    const entityIndex = this.db.favs.albums.findIndex((item) => item.id === id);

    this.db.favs.albums.splice(entityIndex, 1);
  }

  createArtist(id: string): Artist {
    const artist: Artist | undefined = this.db.artists.find(
      (entity) => entity.id === id,
    );

    if (!artist) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    this.db.favs.artists.push(artist);
    return artist;
  }

  removeArtist(id: string): void {
    const entityIndex = this.db.favs.artists.findIndex(
      (item) => item.id === id,
    );

    this.db.favs.artists.splice(entityIndex, 1);
  }

  createTrack(id: string): Track {
    const track: Track | undefined = this.db.tracks.find(
      (entity) => entity.id === id,
    );

    if (!track) {
      throw new UnprocessableEntityException("Item doesn't exist");
    }

    this.db.favs.tracks.push(track);
    return track;
  }

  removeTrack(id: string): void {
    const entityIndex = this.db.favs.tracks.findIndex((item) => item.id === id);

    this.db.favs.tracks.splice(entityIndex, 1);
  }
}
