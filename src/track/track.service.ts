import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Track } from './entities/track.entity';
import { TrackRepository } from './track.repository';
// import { FavsService } from 'src/favs/favs.service';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    // private readonly favsService: FavsService,
  ) {}

  private async getEntity(id: string): Promise<Track> {
    const entity: Track | null = await this.trackRepository.getOne(id);

    if (!entity) {
      throw new NotFoundException('Track not found');
    }

    return entity;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const entity: Track = new Track({ id: v4(), ...createTrackDto });

    if (!createTrackDto?.artistId) {
      entity.artistId = null;
    }

    if (!createTrackDto?.albumId) {
      entity.albumId = null;
    }

    await this.trackRepository.create(entity);
    return entity;
  }

  async getAll(): Promise<Track[]> {
    return await this.trackRepository.getAll();
  }

  async getOneById(id: string): Promise<Track> {
    return await this.getEntity(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const entity: Track = await this.getEntity(id);

    Object.assign(entity, updateTrackDto);
    await this.trackRepository.update(entity);

    return entity;
  }

  async remove(id: string): Promise<void> {
    await this.getEntity(id);

    await this.trackRepository.remove(id);
    console.log(`This action removes a #${id} track`);

    // const entityIndex = this.db.tracks.findIndex(
    //   (item) => item.id === entity.id,
    // );

    // this.db.tracks.splice(entityIndex, 1);

    // this.favsService.removeTrack(id);
  }
}
