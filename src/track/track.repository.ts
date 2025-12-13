import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Track } from './entities/track.entity';

@Injectable()
export class TrackRepository {
  constructor(
    @InjectRepository(Track)
    private trackTable: Repository<Track>,
  ) {}

  async create(entity: Track): Promise<Track> {
    return await this.trackTable.save(entity);
  }

  async getAll(): Promise<Track[]> {
    return await this.trackTable.find();
  }

  async getOne(id: string): Promise<Track | null> {
    return await this.trackTable.findOneBy({ id });
  }

  async update(updatedData: Track): Promise<void> {
    const { id, name, artistId, albumId, duration } = updatedData;

    await this.trackTable.update(
      { id: id },
      { name, artistId, albumId, duration },
    );
  }

  async remove(id: string): Promise<void> {
    await this.trackTable.delete(id);
  }
}
