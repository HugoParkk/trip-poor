import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/boardEntity.entity';
import { Repository } from 'typeorm';
import { BoardStatus } from 'src/utils/enum/boardStatus.enum';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);

  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async getAllBoards(): Promise<BoardEntity[]> {
    this.logger.debug('getAllBoards');
    const boards: BoardEntity[] = await this.boardRepository.find();
    return boards;
  }

  async createBoard(body: any): Promise<BoardEntity> {
    this.logger.debug('createBoard');
    const newBoard: BoardEntity = new BoardEntity();
    newBoard.authorId = body.authorId;
    newBoard.title = body.title;
    newBoard.description = body.description;
    newBoard.content = body.content;
    newBoard.tags = JSON.stringify(body.tags);
    newBoard.status = body.status;
    this.logger.debug(JSON.stringify(newBoard));
    
    return await this.boardRepository.save(newBoard);
  }
}
