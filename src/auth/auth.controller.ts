import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from './public.decorator';

import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import type { UserResponse } from '../user/types/user.type';
import type { TokenResponse } from './types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<UserResponse, 'password'>> {
    return await this.authService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginUserDto: LoginUserDto): Promise<TokenResponse> {
    return await this.authService.login(loginUserDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @Body() { refreshToken }: RefreshTokenDto,
  ): Promise<TokenResponse> {
    return await this.authService.refresh(refreshToken);
  }
}
