import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
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
import { UpdateEmotionDto } from './interfaces/UpdateEmotionDto';
import { Emotion } from 'src/utils/enum/emotion';
import { CommentDto } from './interfaces/CommentDto';

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

  @ApiOperation({ summary: '게시물에 반응 추가', description: '게시물에 반응을 추가합니다.' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: 'add emotion success', type: ApiResponse })
  @Put(':id/emotion')
  @UseGuards(AuthGuard('jwt'))
  async updateEmotion(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') boardId: number,
    @Body() body: UpdateEmotionDto,
  ) {
    const userEmail = req.user.email;
    const emotion: Emotion = body.emotion;
    this.logger.debug(body);
    this.logger.debug(emotion);

    if (emotion == null) {
      return res.json({ code: 400, message: 'emotion is not valid' });
    }

    return res.json(await this.boardService.updateEmotion(boardId, userEmail, emotion));
  }

  @ApiOperation({ summary: '게시물 댓글 조회', description: '게시물의 댓글을 조회합니다.' })
  @ApiResponse({ status: 200, description: 'get comment success', type: ApiResponse })
  @Get(':id/comment')
  async getComment(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') boardId: number,
  ) {
    /* TODO: get comment */
    return res.json(await this.boardService.getComments(boardId));
  }

  @ApiOperation({ summary: '게시물에 댓글 추가', description: '게시물에 댓글을 추가합니다.' })
  @ApiBody({
    type: CommentDto,
    description: '댓글 생성 정보',
    required: true,
  })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: 'add comment success', type: ApiResponse })
  @Post(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  async addComment(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') boardId: number,
    @Body() body: CommentDto,
  ) {
    const userEmail = req.user.email;
    const content: string = body.content;

    if (content == null) {
      return res.json({ code: 400, message: 'content is not valid' });
    }

    /* TODO: add comment */
    return res.json(await this.boardService.addComment(boardId, userEmail, body));
  }

  @ApiOperation({ summary: '게시물 댓글 수정', description: '게시물의 댓글을 수정합니다.' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: 'update comment success', type: ApiResponse })
  @Put(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  async updateComment(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') boardId: number,
    @Query('commentId') commentId: number,
    @Body() body: any
  ) {
    const userEmail = req.user.email;
    const content: string = body.content;

    if (content == null) {
      return res.json({ code: 400, message: 'content is not valid' });
    }

    /* TODO: update comment */
    // return res.json(await this.boardService.updateComment(boardId, userEmail, commentId, content));
  }

  @ApiOperation({ summary: '게시물 댓글 삭제', description: '게시물의 댓글을 삭제합니다.' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: 'delete comment success', type: ApiResponse })
  @Delete(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') boardId: number,
    @Query('commentId') commentId: number,
  ) {
    const userEmail = req.user.email;
    /* TODO: delete comment */
    // return res.json(await this.boardService.deleteComment(id, userEmail));

  }
}
