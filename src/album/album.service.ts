import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { DataBase } from 'src/db/db';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly db: DataBase,
    private readonly favsService: FavsService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const entity = new Album({ id: v4(), ...createAlbumDto });

    if (!createAlbumDto.artistId) {
      entity.artistId = null;
    }

    this.db.albums.push(entity);
    return entity;
  }

  findAll(): Album[] | [] {
    return this.db.albums;
  }

  findOne(id: string): Album {
    const entity: Album | undefined = this.db.albums.find(
      (entity) => entity.id === id,
    );

    if (!entity) {
      throw new NotFoundException('Item not found');
    }

    return entity;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const entity = this.findOne(id);

    const newAlbum = {
      id,
      name: updateAlbumDto?.name || entity.name,
      year: updateAlbumDto?.year || entity.year,
      artistId: updateAlbumDto?.artistId || entity.artistId,
    };

    return newAlbum;
  }

  remove(id: string): void {
    const entity = this.findOne(id);

    const entityIndex = this.db.albums.findIndex(
      (item) => item.id === entity.id,
    );

    this.db.albums.splice(entityIndex, 1);

    const albumTracks = this.db.tracks.filter(
      (track) => track.albumId === entity.id,
    );
    albumTracks.forEach((track) => (track.albumId = null));

    this.favsService.removeAlbum(id);

    console.log(`This action removes a #${id} album`);
  }
}
