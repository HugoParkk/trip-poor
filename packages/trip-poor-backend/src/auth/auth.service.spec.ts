import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { GoogleOauthStrategy } from './strategies/googleOauth.strategy';
import { AccessJwtStrategy } from './strategies/accessJwt.strategy';
import { RefreshJwtStrategy } from './strategies/refreshJwt.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/userEntity.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: GoogleOauthStrategy,
          useValue: {
            validate: jest.fn(),
          },
        },
        {
          provide: AccessJwtStrategy,
          useValue: {
            validate: jest.fn(),
          },
        },
        {
          provide: RefreshJwtStrategy,
          useValue: {
            validate: jest.fn(),
          },
        },
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
