import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Album } from './entities/album.entity';
import { AlbumRepository } from './album.repository';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  private async getEntity(id: string): Promise<Album> {
    const entity: Album | null = await this.albumRepository.getOne(id);

    if (!entity) {
      throw new NotFoundException('Album not found');
    }

    return entity;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const entity = new Album({ id: v4(), ...createAlbumDto });

    if (!createAlbumDto.artistId) {
      entity.artistId = null;
    }

    await this.albumRepository.create(entity);
    return entity;
  }

  async getAll(): Promise<Album[]> {
    return await this.albumRepository.getAll();
  }

  async getOneById(id: string): Promise<Album> {
    return await this.getEntity(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const entity: Album = await this.getEntity(id);

    Object.assign(entity, updateAlbumDto);
    await this.albumRepository.update(entity);

    return entity;
  }

  async remove(id: string): Promise<void> {
    await this.getEntity(id);

    await this.albumRepository.remove(id);
    console.log(`This action removes a #${id} album`);
  }
}
