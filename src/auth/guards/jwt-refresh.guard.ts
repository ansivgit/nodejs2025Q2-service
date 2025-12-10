import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import type { UserTokenPayload } from '../types/auth.type';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromBody(request);

    if (!token) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload: UserTokenPayload =
        await this.authService.verifyRefreshToken(token);
      request['refreshPayload'] = payload;
    } catch (error) {
      throw error;
    }

    return true;
  }

  private extractTokenFromBody(request: Request): string | undefined {
    return request.body?.['refresh_token'];
  }
}
