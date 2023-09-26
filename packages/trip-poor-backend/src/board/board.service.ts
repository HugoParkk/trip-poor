import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'src/entities/boardEntity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);

  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async getAllBoards() {
    
    return 'getAllBoards';
  }

  async createBoard(body: any) {
    const newBoard: BoardEntity = new BoardEntity();
    newBoard.authorId = body.authorId;
    newBoard.title = body.title;
    newBoard.description = body.description;
    newBoard.content = body.content;
    newBoard.tags = body.tags;
    newBoard.status = body.status;
    
    return await this.boardRepository.save(newBoard);;
  }
}
