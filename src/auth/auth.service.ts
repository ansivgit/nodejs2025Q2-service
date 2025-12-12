import {
  Injectable,
  // NotFoundException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import type { JwtPayload } from 'jsonwebtoken';

import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import type { UserResponse } from '../user/types/user.type';
import type { TokenResponse } from './types/auth.type';
import { RES_ERROR_MESSAGES } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async getExistingUsers(login: string): Promise<User[]> {
    const existingUsers: User[] =
      await this.userRepository.getOneByLogin(login);
    return existingUsers;
  }

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserResponse, 'password'>> {
    const { login } = createUserDto;
    const isUserExist: number = (await this.getExistingUsers(login)).length;

    if (isUserExist) {
      throw new ConflictException(RES_ERROR_MESSAGES[409]);
    }

    return await this.userService.create(createUserDto);
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<TokenResponse> {
    const { login, password } = loginUserDto;
    const user: User | undefined = (await this.getExistingUsers(login))[0];

    if (!user) {
      throw new ForbiddenException(RES_ERROR_MESSAGES['403_login']);
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new ForbiddenException(RES_ERROR_MESSAGES['403_pswd']);
    }

    const payload: JwtPayload = {
      userId: user.id,
      login: user.login,
    };

    return await this.generateTokens(payload);
  }

  async refresh(refreshToken: string): Promise<TokenResponse> {
    try {
      const payload: JwtPayload =
        await this.jwtService.verifyAsync(refreshToken,
          {
            secret: process.env.JWT_REFRESH_SECRET,
          },
        );

      const user: Pick<User, 'id' | 'login'> = {
        id: payload.userId,
        login: payload.login,
      };

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async generateTokens(payload: JwtPayload): Promise<TokenResponse> {
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload,
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
          secret: process.env.JWT_REFRESH_SECRET,
        }
      ),
    };
  }
}
