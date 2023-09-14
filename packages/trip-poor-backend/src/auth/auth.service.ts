import { Injectable, Logger } from '@nestjs/common';
import { GoogleUser } from './interfaces/GoogleUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/userEntity.entity';
import { JwtPayload } from './interfaces/JwtPayload';
import { JwtService } from '@nestjs/jwt';
import { UserProvider } from 'src/utils/enum/userProvider.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(googleUser: GoogleUser): Promise<UserEntity> {
    const { provider, providerId, email, name, photoUrl } = googleUser;

    const user: UserEntity = await this.userRepository.findOne({
      where: { provider, providerId },
    });

    this.logger.debug(JSON.stringify(user));

    if (user) {
      return user;
    }

    const newUser = new UserEntity();
    newUser.provider = provider;
    newUser.providerId = providerId;
    newUser.email = email;
    newUser.name = name;
    newUser.avatar = photoUrl;

    return await this.userRepository.save(newUser);
  }

  async getToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET, 
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async updateHashedRefreshToken(providerId: string, refreshToken: string) {
    const user: UserEntity = await this.userRepository.findOne({
      where: { providerId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    user.verificationToken = refreshToken;

  }
}
