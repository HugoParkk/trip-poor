import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/boardEntity.entity';
import { In, Repository } from 'typeorm';
import { BoardStatus } from '../utils/enum/boardStatus';
import { EmotionEntity } from '../entities/emotionEntity.entity';
import { Emotion } from '../utils/enum/emotion';
import { ApiResponse } from 'src/utils/ApiResponse';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);

  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,

    @InjectRepository(EmotionEntity)
    private readonly emotionRepository: Repository<EmotionEntity>,
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

  async updateEmotion(
    boardId: number,
    userId: number,
    emotion: Emotion,
  ): Promise<ApiResponse> {
    this.logger.debug('updateEmotion');

    const emotions = await this.emotionRepository.find({
      where: { boardId: boardId, userId: userId, emotion: emotion },
    });

    if (emotions != undefined) {
      await this.emotionRepository.remove(emotions[0]);
      return {code: 200, message: 'remove emotion success'} as ApiResponse;
    }

    const emotionEntity: EmotionEntity = new EmotionEntity();
    emotionEntity.boardId = boardId;
    emotionEntity.userId = userId;
    emotionEntity.emotion = emotion;

    await this.emotionRepository.save(emotionEntity);
    return {code: 200, message: 'add emotion success'} as ApiResponse;
  }
}
