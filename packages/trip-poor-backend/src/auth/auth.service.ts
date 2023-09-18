import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { GoogleUser } from './interfaces/GoogleUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/userEntity.entity';
import { JwtPayload } from './interfaces/JwtPayload';
import { JwtService } from '@nestjs/jwt';
import { RSACrypto } from 'src/utils/rsaCrypto';
import { UserProvider } from 'src/utils/enum/userProvider.enum';
import { ResgisterDto } from './interfaces/RegisterDto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async localLogin(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isDeleted) {
      throw new Error('User is deleted');
    }

    if (user.isBanned) {
      throw new Error('User is banned');
    }

    return user;
  }

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

    await this.userRepository.save(user);
    return;
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isDeleted) {
      throw new BadRequestException('User is deleted');
    }

    if (user.isBanned) {
      throw new BadRequestException('User is banned');
    }

    const passwordMatch: boolean = RSACrypto.match(password, user.password, process.env.RSA_PRIVATE_KEY);
    this.logger.debug(JSON.stringify(passwordMatch));

    if (!passwordMatch) {
      throw new BadRequestException('Password is not match');
    }

    return user;
  }

  async localRegister(value: ResgisterDto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { email: value.email },
    });

    if (user) {
      throw new Error('User is already exist');
    }

    const newUser = new UserEntity();
    newUser.provider = UserProvider.LOCAL;
    newUser.providerId = value.email;
    newUser.email = value.email;
    newUser.password = RSACrypto.encrypt(value.password, process.env.RSA_PRIVATE_KEY);
    newUser.name = value.name;
    newUser.avatar = "";

    this.logger.debug(JSON.stringify(newUser));

    return await this.userRepository.save(newUser);
  }
}
