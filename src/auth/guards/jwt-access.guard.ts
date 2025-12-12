import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from 'jsonwebtoken';

import { AUTH_ERROR_MESSAGES, IS_PUBLIC_KEY, TOKEN_TYPE } from '../../constants';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES[401]);
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token,
        {
          secret: process.env.JWT_ACCESS_SECRET,
          // ignoreExpiration: false,
        },
      );

      request.token = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith(`${TOKEN_TYPE} `)) {
      return;
    }

    const [type, token] = authHeader.split(' ');
    return type === TOKEN_TYPE ? token : undefined;
  }
}
