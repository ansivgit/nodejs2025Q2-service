import {
  Injectable,
  // NotFoundException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { hash, compare } from 'bcrypt';

import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { serializeUser } from '../utils';

import type { UserResponse } from '../user/types/user.type';
import type { TokenResponse, UserTokenPayload } from './types/auth.type';
import { RES_ERROR_MESSAGES, TOKEN_TYPE } from '../constants';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {
    this.jwtAccessService = new JwtService({
      secret: process.env.JWT_ACCESS_SECRET || 'access-secret',
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' },
    });

    this.jwtRefreshService = new JwtService({
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
      signOptions: { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' },
    });
  }

  private readonly jwtAccessService: JwtService;
  private readonly jwtRefreshService: JwtService;

  private async getExistingUsers(login: string): Promise<User[]> {
    const existingUsers: User[] =
      await this.userRepository.getOneByLogin(login);
    return existingUsers;
  }

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserResponse, 'password'>> {
    const { login, password } = createUserDto;
    //! проверить, не могут ли несколько пользователей (тестовых) быть зареганы с одним логином
    const isUserExist: number = (await this.getExistingUsers(login)).length;

    if (isUserExist) {
      throw new ConflictException(RES_ERROR_MESSAGES[409]);
    }

    const encryptedPassword: string = await hash(password, 10);
    const userInfo = { id: v4(), version: 1 };

    const entity: User = new User({
      login,
      password: encryptedPassword,
      ...userInfo,
    });
    const registeredUser: User = await this.userRepository.create(entity);

    return serializeUser(registeredUser);
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<Omit<UserResponse, 'password'>> {
    const { login, password } = loginUserDto;

    const user: User = (await this.getExistingUsers(login))[0];
    const isValid = await compare(password, user?.password);

    if (!user || !isValid) {
      throw new ForbiddenException(RES_ERROR_MESSAGES[403]);
    }

    return await this.generateTokens(user);
  }

  async generateAccessToken(payload: UserTokenPayload): Promise<string> {
    return this.jwtAccessService.signAsync(payload);
  }

  async generateRefreshToken(userId: User['id']): Promise<string> {
    return this.jwtRefreshService.signAsync({ sub: userId });
  }

  async verifyAccessToken(token: string): Promise<UserTokenPayload> {
    try {
      return await this.jwtAccessService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async verifyRefreshToken(token: string): Promise<UserTokenPayload> {
    try {
      return await this.jwtRefreshService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async generateTokens(
    user: Pick<User, 'id' | 'login'>,
  ): Promise<TokenResponse> {
    const payload: UserTokenPayload = {
      userId: user.id,
      login: user.login,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(user.id),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: TOKEN_TYPE,
      expires_in: 900,
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokenResponse> {
    try {
      const payload: UserTokenPayload =
        await this.verifyRefreshToken(refreshToken);

      const user: Pick<User, 'id' | 'login'> = {
        id: payload.userId,
        login: payload.login,
      };

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
