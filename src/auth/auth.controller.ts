import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<Omit<UserResponse, 'password'>> {
    return await this.authService.login(loginUserDto); // Tokens' object
  }

  @Public()
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Request() req: Request): Promise<TokenResponse> {
    return await this.authService.refreshTokens(req.body['refresh_token']);
  }
}
