import { Controller, Logger, Get, UseGuards, Req, Res, Post, Body, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserEntity } from '../entities/userEntity.entity';
import { GoogleUser } from './interfaces/GoogleUser';
import { JwtPayload } from './interfaces/JwtPayload';
import { LocalUserReq } from './interfaces/LocalUserReq';
import { RSACrypto } from 'src/utils/rsaCrypto';
import { LoginDto } from './interfaces/LoginDto';
import { ResgisterDto } from './interfaces/RegisterDto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags ('인증 API')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: String, description: '암호화 된 계정 정보', required: true, examples: { Body: { value: {'value': "asdfasdfsadfadf"} } } })
  @ApiResponse({ status: 200, description: '성공', type: UserEntity})
  // @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request, @Body('value') value: string): Promise<UserEntity> {
    this.logger.debug('login');
    this.logger.debug(value);

    if (!value) {
      throw new BadRequestException('body value not found');
    }

    const privateKey: string = process.env.RSA_PRIVATE_KEY;
    const decryptedValue: string = RSACrypto.decrypt(value, privateKey);
    const loginDto: LoginDto = JSON.parse(decryptedValue);

    this.logger.debug(JSON.stringify(loginDto));

    if (loginDto) {
      if (loginDto.email == null || loginDto.password == null) {
        throw new BadRequestException('email or password not found');
      }
    }

    const user: UserEntity = await this.authService.validateUser(loginDto.email, loginDto.password);
    this.logger.debug(JSON.stringify(user));

    return user as UserEntity;
  }

  @Post('register')
  async register(@Req() req: Request, @Res() res: Response, @Body('value') value: string): Promise<Response<UserEntity>> {
    this.logger.debug('register');
    
    if (!value) {
      throw new BadRequestException('body value not found');
    }

    const privateKey: string = process.env.RSA_PRIVATE_KEY;
    const decryptedValue: string = RSACrypto.decrypt(value, privateKey);
    const registerDto: ResgisterDto = JSON.parse(decryptedValue);

    const user: UserEntity = await this.authService.localRegister(registerDto);

    if(user) {
      this.logger.debug(user);
      return res.send(user);
    }
  }

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

    this.logger.debug(`accessToken: ${accessToken}`);
    this.logger.debug(`refreshToken: ${refreshToken}`);
    res.redirect(process.env.DOMAIN);
    // const jwt: UserEntity = await this.authService.googleLogin(user);
    // res.redirect(`http://localhost:3000/login/success?token=${jwt}`);
  }
}
