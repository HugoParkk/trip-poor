import { Controller, Logger, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserEntity } from '../entities/userEntity.entity';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    this.logger.debug('googleAuth');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response): Promise<void> {
    this.logger.debug('googleAuthCallback');
    const { user } = req;
    const jwt: UserEntity = await this.authService.googleLogin(user);
    // res.redirect(`http://localhost:3000/login/success?token=${jwt}`);
  }
}
