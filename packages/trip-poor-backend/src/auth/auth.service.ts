import { Injectable } from '@nestjs/common';
import { GoogleUser } from './interfaces/GoogleUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/userEntity.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async googleLogin(googleUser: GoogleUser): Promise<UserEntity> {
    const { provider, providerId, email, name } = googleUser;

    const user: UserEntity = await this.userRepository.findOne({
      where: { provider, providerId },
    });

    if (user) {
      return user;
    }

    const newUser = new UserEntity();
    newUser.provider = provider;
    newUser.providerId = providerId;
    newUser.email = email;
    newUser.name = name;

    return await this.userRepository.save(newUser);
  }
}
