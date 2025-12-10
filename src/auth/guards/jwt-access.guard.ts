import {
  Injectable,
  CanActivate,
  ExecutionContext,
  // UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import type { UserTokenPayload } from '../types/auth.type';
import { IS_PUBLIC_KEY, PUBLIC_PATHS, TOKEN_TYPE } from '../../constants';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (this.isGlobalPublicPath(request.path)) {
      return true;
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token: string | undefined = this.extractTokenFromHeader(request);

    if (!token) {
      return false;
      // throw new UnauthorizedException('Access token not found');
    }

    try {
      const payload: UserTokenPayload =
        await this.authService.verifyAccessToken(token);
      request.user = payload;
      return true;
    } catch (error) {
      // throw error;
      return false;
    }

    // return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith(`${TOKEN_TYPE} `)) {
      return;
    }

    const [type, token] = authHeader.split(' ');
    return type === TOKEN_TYPE ? token : undefined;
  }

  private isGlobalPublicPath(path: string): boolean {
    return PUBLIC_PATHS.some(
      (publicPath) => path === publicPath || path.startsWith(publicPath + '/'),
    );
  }
}
