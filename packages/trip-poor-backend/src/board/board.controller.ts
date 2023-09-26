import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BoardService } from './board.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({ status: 200, description: '성공', type: BoardEntity })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBoard(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateBoardDto,
  ) {
    return res.json(await this.boardService.createBoard(body));
  }
}
