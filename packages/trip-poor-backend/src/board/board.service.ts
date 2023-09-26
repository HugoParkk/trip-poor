import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/boardEntity.entity';
import { Repository } from 'typeorm';
import { BoardStatus } from 'src/utils/enum/boardStatus';

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

  async getBoard(id: number): Promise<BoardEntity> {
    this.logger.debug('getBoard');
    const board: BoardEntity = await this.boardRepository.findOne({
      where: { id: id },
    });
    return board;
  }

  async createBoard(body: any): Promise<BoardEntity> {
    this.logger.debug('createBoard');
    const newBoard: BoardEntity = new BoardEntity();
    newBoard.authorId = body.authorId;
    newBoard.title = body.title;
    newBoard.description = body.description;
    newBoard.content = body.content;
    newBoard.tags = JSON.stringify(body.tags);
    newBoard.status = body.status as BoardStatus;
    this.logger.debug(JSON.stringify(newBoard));

    return await this.boardRepository.save(newBoard);
  }
}
