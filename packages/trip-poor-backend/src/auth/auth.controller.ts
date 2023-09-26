import {
  Controller,
  Logger,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserEntity } from '../entities/userEntity.entity';
import { GoogleUser } from './interfaces/GoogleUser';
import { JwtPayload } from './interfaces/JwtPayload';
import { LocalUserReq } from './interfaces/LocalUserReq';
import { RSACrypto } from '../utils/rsaCrypto';
import { ResgisterDto } from './interfaces/RegisterDto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('인증 API')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인', description: 'local 로그인' })
  @ApiBody({
    type: LocalUserReq,
    description: '암호화 된 계정 정보',
    required: true,
  })
  @ApiResponse({ status: 200, description: '성공', type: UserEntity })
  @Post('login')
  // @UseGuards(AuthGuard('local'))
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body('value') value: string,
  ): Promise<void> {
    this.logger.debug('login');
    this.logger.debug(value);

    if (!value) {
      throw new BadRequestException('body value not found');
    }

    const user: UserEntity = await this.authService.validateUser(value);

    // JWT Login Start
    const payload: JwtPayload = { sub: user.providerId, email: user.email };

    const { accessToken, refreshToken } =
      await this.authService.getToken(payload);

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);

    await this.authService.updateHashedRefreshToken(
      user.providerId,
      refreshToken,
    );

    this.logger.debug(`access-token: ${accessToken}`);
    this.logger.debug(`refresh-token: ${refreshToken}`);

    this.logger.debug(JSON.stringify(user));
    // JWT Login End

    // return user as UserEntity;
    res.redirect(process.env.DOMAIN);
  }

  @ApiOperation({ summary: '회원가입', description: 'local 회원가입' })
  @ApiBody({
    type: String,
    description:
      '암호화 된 계정 정보 example => 암호화 이전 JSON {email: "email",password: "encrypedPassword",name: "username"}',
    required: true,
    examples: { Body: { value: { value: 'asdfasdfsadfadf' } } },
  })
  @Post('register')
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body('value') value: string,
  ): Promise<Response<UserEntity>> {
    this.logger.debug('register');

    if (!value) {
      throw new BadRequestException('body value not found');
    }

    const privateKey: string = process.env.RSA_PRIVATE_KEY;
    const decryptedValue: string = RSACrypto.decrypt(value, privateKey);
    const registerDto: ResgisterDto = JSON.parse(decryptedValue);

    const user: UserEntity = await this.authService.localRegister(registerDto);

    if (user) {
      this.logger.debug(user);
      return res.send(user);
    }
  }

  @ApiOperation({
    summary: '구글 로그인',
    description: 'Google OAuth callback To /google/callback',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    this.logger.debug('googleAuth');
  }

  @ApiOperation({
    summary: '구글 로그인 callback',
    description: 'Google OAuth callback From /google',
  })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.debug('googleAuthCallback');
    const user = await this.authService.googleLogin(req.user as GoogleUser);

    const payload: JwtPayload = { sub: user.providerId, email: user.email };

    const { accessToken, refreshToken } =
      await this.authService.getToken(payload);

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);

    await this.authService.updateHashedRefreshToken(
      user.providerId,
      refreshToken,
    );

    this.logger.debug(`access-token: ${accessToken}`);
    this.logger.debug(`refresh-token: ${refreshToken}`);

    res.redirect(process.env.DOMAIN);

    // res.redirect(`http://localhost:3000/login/success?token=${jwt}`);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { refreshToken, sub, email } = req.user as JwtPayload & {
      refreshToken: string;
    };

    const user = await this.authService.findByProviderIdAndRefreshToken(
      sub,
      refreshToken,
    );

    const token = await this.authService.getToken({ sub, email });

    res.cookie('access-token', token.accessToken);
    res.cookie('refresh-token', token.refreshToken);

    await this.authService.updateHashedRefreshToken(
      user.providerId,
      refreshToken,
    );

    res.redirect(process.env.DOMAIN);
  }
}
