import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private artistTable: Repository<Artist>,
  ) {}

  async create(entity: Artist): Promise<Artist> {
    return await this.artistTable.save(entity);
  }

  async getAll(): Promise<Artist[]> {
    return await this.artistTable.find();
  }

  async getOne(id: string): Promise<Artist | null> {
    return await this.artistTable.findOneBy({ id });
  }

  async update(updatedData: Artist): Promise<void> {
    const { id, name, grammy } = updatedData;

    await this.artistTable.update(
      { id: id },
      { name, grammy },
    );
  }

  async remove(id: string): Promise<void> {
    await this.artistTable.delete(id);
  }
}
