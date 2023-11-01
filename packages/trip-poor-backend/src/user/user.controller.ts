import { Body, Controller, Delete, Get, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UpdateUserDto } from './interfaces/UpdateUserDto';

@ApiTags('유저 프로필 관리 API')
@Controller('user')
export class UserController {

  constructor (private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 프로필 조회', description: '유저 프로필 조회' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: '성공' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() req: Request, @Res() res: Response) {
    const userEmail = req.user.email;
    return res.json(await this.userService.getUserProfile(userEmail));
  }

  @ApiOperation({ summary: '유저 프로필 수정', description: '유저 프로필 수정'})
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: '성공' })
  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateUserProfile(@Req() req: Request, @Res() res: Response, @Body() body: UpdateUserDto) {
    const userEmail = req.user.email;
    return res.json(await this.userService.updateUserProfile(userEmail, body));
  }

  @ApiOperation({ summary: '유저 프로필 삭제', description: '유저 프로필 삭제'})
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: '성공' })
  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteUserProfile(@Req() req: Request, @Res() res: Response) {

    // TODO: 유저 프로필 삭제
    // 회원 탈퇴
    // return
  }
}
