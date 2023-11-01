import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/userEntity.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './interfaces/UpdateUserDto';
import { ApiResponse } from 'src/utils/ApiResponse';
import { HttpStatusCode } from 'axios';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserProfile(email: string): Promise<UserEntity> {
    this.logger.debug('getUserProfile');

    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async updateUserProfile(email: string, profile: UpdateUserDto): Promise<ApiResponse> {
    this.logger.debug('updateUserProfile');
    
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user.id != profile.id) {
      return { code: HttpStatusCode.BadRequest, message: 'invalid user id'} as ApiResponse
    }

    user.name = profile.name;
    user.avatar = profile.avatar;
    user.description = profile.description;

    await this.userRepository.save(user);

    return { code: 200, message: 'update profile success'} as ApiResponse;
  }
}
