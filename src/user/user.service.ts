import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { hash, compare } from 'bcrypt';

import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { serializeUser } from '../utils';

import type { UserResponse } from './types/user.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async getEntity(id: string): Promise<User> {
    const entity: User | null = await this.userRepository.getOne(id);

    if (!entity) {
      throw new NotFoundException('Person not found');
    }

    return entity;
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserResponse, 'password'>> {
    const { login, password } = createUserDto;

    const userInfo = { id: v4(), version: 1 };
    const encryptedPassword: string = await hash(password, 10);
    const entity: User = new User({
      login,
      password: encryptedPassword,
      ...userInfo,
    });

    const registeredUser: User = await this.userRepository.create(entity);

    return serializeUser(registeredUser);
  }

  async getAll(): Promise<Omit<UserResponse, 'password'>[]> {
    const users = await this.userRepository.getAll();
    return users.map((user) => serializeUser(user));
  }

  async getOneById(id: string): Promise<Omit<UserResponse, 'password'>> {
    const entity: User = await this.getEntity(id);
    return serializeUser(entity);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<UserResponse, 'password'>> {
    const { oldPassword, newPassword } = updateUserDto;

    const entity: User = await this.getEntity(id);
    const isValid = await compare(oldPassword, entity.password);

    if (!isValid) {
      throw new ForbiddenException('Incorrect password');
    }

    const encryptedNewPassword: string = await hash(newPassword, 10);

    entity.password = encryptedNewPassword;
    entity.version += 1;
    entity.updatedAt = new Date();

    await this.userRepository.update(entity);

    return serializeUser(entity);
  }

  async remove(id: string): Promise<void> {
    await this.getEntity(id);

    await this.userRepository.remove(id);
    console.info(`This action removes a #${id} user`);
  }
}
