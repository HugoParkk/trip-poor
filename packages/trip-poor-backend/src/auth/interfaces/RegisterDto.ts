import { IsEmail, IsString } from 'class-validator';

export class ResgisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
