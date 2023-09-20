import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../utils/base.entity';
import { IsNumber, IsEmail, IsString, IsBoolean, IsEnum } from 'class-validator';
import { UserProvider } from 'src/utils/enum/userProvider.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('User')
export class UserEntity extends BaseEntity {
  
  @ApiProperty({ description: '유저 고유 번호', default: 1 })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '유저 이메일', default: 'test@testmail.com'})
  @Column()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '유저 이름', default: 'testName'})
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ description: '가입형태', default: 'local'})
  @Column()
  @IsEnum(UserProvider)
  provider: UserProvider;

  @ApiProperty({ description: '가입형태 고유 ID', default: 'test@testmail.com'})
  @PrimaryColumn()
  @Column()
  @IsString()
  providerId: string;

  @ApiProperty({ description: '암호화된 비밀번호', default: 'asdfasdfasdf'})
  @Column({ nullable: true })
  @IsString()
  password: string;

  @ApiProperty({ description: '프로필 사진', default: 'http://test.com/test.png'})
  @Column({ default: '' })
  @IsString()
  avatar: string;

  @ApiProperty({ description: '어드민 여부', default: false})
  @Column({ default: false })
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({ description: '밴 여부', default: false})
  @Column({ default: false })
  @IsBoolean()
  isBanned: boolean;

  @ApiProperty({ description: '계정 삭제 여부', default: false})
  @Column({ default: false })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({ description: '인증 여부', default: false})
  @Column({ default: false })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({ description: '인증토큰', default: 'exampleVerificationToken'})
  @Column({ nullable: true })
  @IsString()
  verificationToken: string;
}
