import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from 'jsonwebtoken';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromBody(request);

    if (!token) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload: JwtPayload = this.jwtService.verifyAsync(token,
        {
          secret: process.env.JWT_REFRESH_SECRET,
          // ignoreExpiration: false,
        },
      );
      request['refreshPayload'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return true;
  }

  private extractTokenFromBody(request: Request): string | undefined {
    return request.body?.['refreshToken'];
  }
}
