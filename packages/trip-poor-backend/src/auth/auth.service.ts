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
import { LoginDto } from './interfaces/LoginDto';

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

  async findByProviderIdAndRefreshToken(
    providerId: string,
    refreshToken: string,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { providerId: providerId, verificationToken: refreshToken },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
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

  async validateUser(value: string): Promise<UserEntity> {
    const privateKey: string = process.env.RSA_PRIVATE_KEY;
    const decryptedValue: string = RSACrypto.decrypt(value, privateKey);
    const loginDto: LoginDto = JSON.parse(decryptedValue);

    this.logger.debug(JSON.stringify(loginDto));

    if (loginDto) {
      if (loginDto.email == null || loginDto.password == null) {
        throw new BadRequestException('email or password not found');
      }
    }

    const user: UserEntity = await this.userRepository.findOne({
      where: { email: loginDto.email },
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

    const passwordMatch: boolean = RSACrypto.match(
      loginDto.password,
      user.password,
      process.env.RSA_PRIVATE_KEY,
    );
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
    newUser.password = RSACrypto.encrypt(
      value.password,
      process.env.RSA_PRIVATE_KEY,
    );
    newUser.name = value.name;
    newUser.avatar = '';

    this.logger.debug(JSON.stringify(newUser));

    return await this.userRepository.save(newUser);
  }
}
