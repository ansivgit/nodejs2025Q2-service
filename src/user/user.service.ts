import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataBase } from 'src/db/db';
import { User } from './entities/user.entity';
import { getOmitObj } from '../utils';

@Injectable()
export class UserService {
  constructor(private readonly db: DataBase) {}

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const { login, password } = createUserDto;

    const userInfo = {
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const entity = new User({
      login,
      password,
      ...userInfo,
    });

    this.db.users.push(entity);

    const registeredUser: Omit<User, 'password'> = {
      login,
      ...userInfo,
    };

    return registeredUser;
  }

  findAll(): User[] | [] {
    const omitUsers = this.db.users.map((user) => getOmitObj(user, 'password'));
    return omitUsers;
  }

  findOne(id: string): Omit<User, 'password'> {
    const entity: User | undefined = this.db.users.find(
      (person) => person.id === id,
    );

    if (!entity) {
      throw new NotFoundException('Person not found');
    }

    const omitEntity: Omit<User, 'password'> = getOmitObj(entity, 'password');
    return omitEntity;
  }

  update(id: string, updateUserDto: UpdateUserDto): Omit<User, 'password'> {
    const entity: User | undefined = this.db.users.find(
      (person) => person.id === id,
    );
    const { oldPassword, newPassword } = updateUserDto;

    if (!entity) {
      throw new NotFoundException('Person not found');
    }

    if (entity?.password !== oldPassword) {
      throw new ForbiddenException('Incorrect password');
    }

    entity.password = newPassword;
    entity.version += 1;
    entity.updatedAt = Date.now();

    const omitEntity: Omit<User, 'password'> = getOmitObj(entity, 'password');
    return omitEntity;
  }

  remove(id: string) {
    const entity = this.findOne(id);

    const entityIndex = this.db.users.findIndex(
      (person) => person.id === entity.id,
    );

    this.db.users.splice(entityIndex, 1);
    console.log(`This action removes a #${id} user`);
  }
}
