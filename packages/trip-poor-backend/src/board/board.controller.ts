import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BoardService } from './board.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './interfaces/CreateBoardDto';
import { AuthGuard } from '@nestjs/passport';
import { BoardEntity } from '../entities/boardEntity.entity';

@ApiTags('게시판 API')
@Controller('board')
export class BoardController {
  private readonly logger = new Logger(BoardController.name);

  constructor(private boardService: BoardService) {}

  @ApiOperation({
    summary: '모든 게시물 조회',
    description: '모든 게시물을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공' })
  @Get()
  async getAllBoards(@Req() req: Request, @Res() res: Response) {
    return res.json(await this.boardService.getAllBoards());
  }

  @ApiOperation({
    summary: '특정 게시물 조회',
    description: '특정 게시물을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: BoardEntity })
  @Get(':id')
  async getBoard(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    return res.json(await this.boardService.getBoard(id));
  }

  @ApiOperation({ summary: '게시판 생성', description: '게시판을 생성합니다.' })
  @ApiBody({
    type: CreateBoardDto,
    description: '게시판 생성 정보',
    required: true,
  })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: '성공', type: BoardEntity })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBoard(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateBoardDto,
  ) {
    const authorEmail = req.user.email;
    return res.json(await this.boardService.createBoard(authorEmail, body));
  }

  @ApiOperation({ summary: '게시판 수정', description: '게시판을 수정합니다.' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: '성공', type: BoardEntity })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateBoard(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
    @Body() body: CreateBoardDto,
  ) {
    const authorEmail = req.user.email;
    return res.json(await this.boardService.updateBoard(id, authorEmail, body));
  }

  @ApiOperation({ summary: '게시판 삭제', description: '게시판을 삭제합니다.' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: '성공', type: ApiResponse })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteBoard(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number
  ) {
    const authorEmail = req.user.email;
    return res.json(await this.boardService.deleteBoard(id, authorEmail));
  }

}
