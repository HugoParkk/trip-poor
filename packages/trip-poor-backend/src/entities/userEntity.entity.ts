import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../utils/base.entity';
import { IsNumber, IsEmail, IsString, IsBoolean } from 'class-validator';

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
  @IsString()
  provider: string;

  @Column()
  @IsString()
  providerId: string;

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
