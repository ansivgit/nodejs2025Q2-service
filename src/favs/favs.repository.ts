import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favs } from './entities/favs.entity';

@Injectable()
export class FavsRepository {
  constructor(
    @InjectRepository(Favs)
    private favsTable: Repository<Favs>,
  ) {}

  private async getOrCreateFavs(): Promise<Favs> {
    let favs = await this.favsTable.findOne({
      where: { id: 'singleton' },
      relations: ['albums', 'artists', 'tracks'],
    });

    if (!favs) {
      favs = this.favsTable.create({ id: 'singleton' });
      favs = await this.favsTable.save(favs);
    }

    return favs;
  }

  async getAll(): Promise<Favs> {
    return await this.getOrCreateFavs();
  }

  async add(favsType: keyof Omit<Favs, 'id'>, entity): Promise<Favs> {
    const favs: Favs = await this.getOrCreateFavs();

    favs[favsType]?.push(entity);
    await this.favsTable.save(favs);

    return favs;
  }

  async update(favs: Favs): Promise<void> {
    await this.favsTable.save(favs);
    console.info('Favorites renewed');
  }
}
