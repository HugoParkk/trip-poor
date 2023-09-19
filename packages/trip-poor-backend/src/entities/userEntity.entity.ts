import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../utils/base.entity';
import { IsNumber, IsEmail, IsString, IsBoolean, IsEnum } from 'class-validator';
import { UserProvider } from 'src/utils/enum/userProvider.enum';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEnum(UserProvider)
  provider: UserProvider;

  @PrimaryColumn()
  @Column()
  @IsString()
  providerId: string;

  @Column({ nullable: true })
  @IsString()
  password: string;

  @Column({ default: '' })
  @IsString()
  avatar: string;

  @Column({ default: false })
  @IsBoolean()
  isAdmin: boolean;

  @Column({ default: false })
  @IsBoolean()
  isBanned: boolean;

  @Column({ default: false })
  @IsBoolean()
  isDeleted: boolean;

  @Column({ default: false })
  @IsBoolean()
  isVerified: boolean;

  @Column({ nullable: true })
  @IsString()
  verificationToken: string;
}
