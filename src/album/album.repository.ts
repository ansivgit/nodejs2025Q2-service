import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Album } from './entities/album.entity';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(Album)
    private albumTable: Repository<Album>,
  ) {}

  async create(entity: Album): Promise<Album> {
    return await this.albumTable.save(entity);
  }

  async getAll(): Promise<Album[]> {
    return await this.albumTable.find();
  }

  async getOne(id: string): Promise<Album | null> {
    return await this.albumTable.findOneBy({ id });
  }

  async update(updatedData: Album): Promise<void> {
    const { id, name, year, artistId } = updatedData;

    await this.albumTable.update({ id: id }, { name, year, artistId });
  }

  async remove(id: string): Promise<void> {
    await this.albumTable.delete(id);
  }
}
