import { Controller, Get, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

  constructor (private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 프로필 조회', description: '유저 프로필 조회' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: '성공' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() req: Request, @Res() res: Response) {

    // TODO: 유저 프로필 조회
    // return 
  }

  @ApiOperation({ summary: '유저 프로필 수정', description: '유저 프로필 수정'})
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: '성공' })
  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateUserProfile(@Req() req: Request, @Res() res: Response) {
    
    // TODO: 유저 프로필 수정
    // return
  }

  
}
