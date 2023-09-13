import { Controller, Logger, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserEntity } from '../entities/userEntity.entity';
import { GoogleUser } from './interfaces/GoogleUser';
import { JwtPayload } from './interfaces/JwtPayload';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    this.logger.debug('googleAuth');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.debug('googleAuthCallback');
    const user = await this.authService.googleLogin(req.user as GoogleUser);

    const payload: JwtPayload = { sub: user.providerId, email: user.email };

    const { accessToken, refreshToken } = await this.authService.getToken(payload);

    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);

    await this.authService.updateHashedRefreshToken(user.providerId, refreshToken);

    res.redirect(process.env.DOMAIN);
    // const jwt: UserEntity = await this.authService.googleLogin(user);
    // res.redirect(`http://localhost:3000/login/success?token=${jwt}`);
  }
}
