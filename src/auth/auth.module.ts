import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// import { User } from './entities/auth.entity';
import { AuthController } from './auth.controller';
// import { UserRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessGuard, JwtRefreshGuard],
  exports: [AuthService, JwtAccessGuard, JwtRefreshGuard],
})
export class AuthModule {}
