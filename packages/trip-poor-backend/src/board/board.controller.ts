import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('게시판 API')
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: '모든 게시판 조회', description: '모든 게시판을 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공' })
  getAllBoards() {
    return this.boardService.getAllBoards();
  }
}
