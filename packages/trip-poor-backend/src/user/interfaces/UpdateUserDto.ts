import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '유저 아이디', default: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '유저 이름', default: '홍길동' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: '유저 아바타',
    default: 'https://avatars.githubusercontent.com/u/54205801?v=4',
  })
  @IsUrl()
  @IsOptional()
  avatar: string;

  @ApiProperty({ description: '유저 설명', default: '테스트 계정입니다.' })
  @IsString()
  @MaxLength(300)
  @IsOptional()
  description: string;
}
