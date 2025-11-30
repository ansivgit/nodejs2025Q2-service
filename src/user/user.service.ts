import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getOmitObj } from '../utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { login, password } = createUserDto;
    const userInfo = { id: v4(), version: 1 };

    const entity: User = new User({ login, password, ...userInfo });

    const registeredUser: User = await this.userRepository.create(entity);

    return getOmitObj(registeredUser, 'password');
  }

  async getAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.getAll();
    return users.map(({ password, ...rest }) => rest);
  }

  async getOneById(id: string): Promise<Omit<User, 'password'>> {
    const entity: User | null = await this.userRepository.getOne(id);

    if (!entity) {
      throw new NotFoundException('Person not found');
    }

    const omitEntity: Omit<User, 'password'> = getOmitObj(entity, 'password');
    return omitEntity;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const entity: User | null = await this.userRepository.getOne(id);
    const { oldPassword, newPassword } = updateUserDto;

    if (!entity) {
      throw new NotFoundException('Person not found');
    }

    if (entity.password !== oldPassword) {
      throw new ForbiddenException('Incorrect password');
    }

    entity.password = newPassword;
    entity.version += 1;
    entity.updatedAt = new Date();

    await this.userRepository.update(entity);

    const omitEntity: Omit<User, 'password'> = getOmitObj(entity, 'password');
    return entity;
  }

  async remove(id: string): Promise<void> {
    const entity: User | null = await this.userRepository.getOne(id);

    if (!entity) {
      throw new NotFoundException('Person not found');
    }

    await this.userRepository.remove(id);
    console.info(`This action removes a #${id} user`);
  }
}
