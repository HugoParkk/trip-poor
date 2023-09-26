import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/userEntity.entity';
import { GoogleOauthStrategy } from './strategies/googleOauth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtStrategy } from './strategies/accessJwt.strategy';
import { RefreshJwtStrategy } from './strategies/refreshJwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleOauthStrategy,
    AccessJwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [AccessJwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
