import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userTable: Repository<User>,
  ) {}

  async create(entity: User): Promise<User> {
    return await this.userTable.save(entity);
  }

  async getAll(): Promise<User[]> {
    return await this.userTable.find();
  }

  async getOne(id: string): Promise<User | null> {
    return await this.userTable.findOneBy({ id });
  }

  async update(updatedData: User): Promise<void> {
    const { id, password, version, updatedAt } = updatedData;

    await this.userTable.update({ id: id }, { password, version, updatedAt });
  }

  async remove(id: string): Promise<void> {
    await this.userTable.delete(id);
  }

  async getOneByLogin(login: string): Promise<User[]> {
    return await this.userTable.find({
      where: {
        login: login,
      },
    });
  }
}
