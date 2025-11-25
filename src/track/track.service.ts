import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { DataBase } from 'src/db/db';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly db: DataBase,
    private readonly favsService: FavsService,
  ) {}

  create(createTrackDto: CreateTrackDto): Track {
    const entity = new Track({ id: v4(), ...createTrackDto });

    if (!createTrackDto?.artistId) {
      entity.artistId = null;
    }

    if (!createTrackDto?.albumId) {
      entity.albumId = null;
    }

    this.db.tracks.push(entity);
    return entity;
  }

  findAll(): Track[] | [] {
    return this.db.tracks;
  }

  findOne(id: string): Track {
    const entity: Track | undefined = this.db.tracks.find(
      (entity) => entity.id === id,
    );

    if (!entity) {
      throw new NotFoundException('Item not found');
    }

    return entity;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const entity = this.findOne(id);

    const newTrack = {
      id,
      name: updateTrackDto?.name || entity.name,
      artistId: updateTrackDto?.artistId || entity.artistId,
      albumId: updateTrackDto?.albumId || entity.albumId,
      duration: updateTrackDto?.duration || entity.duration,
    };

    return newTrack;
  }

  remove(id: string): void {
    const entity = this.findOne(id);

    const entityIndex = this.db.tracks.findIndex(
      (item) => item.id === entity.id,
    );

    this.db.tracks.splice(entityIndex, 1);

    this.favsService.removeTrack(id);

    console.log(`This action removes a #${id} track`);
  }
}
