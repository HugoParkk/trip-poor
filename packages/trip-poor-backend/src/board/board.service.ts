import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/boardEntity.entity';
import { In, Repository } from 'typeorm';
import { BoardStatus } from '../utils/enum/boardStatus';
import { EmotionEntity } from '../entities/emotionEntity.entity';
import { Emotion } from '../utils/enum/emotion';
import { ApiResponse } from 'src/utils/ApiResponse';
import { UserEntity } from 'src/entities/userEntity.entity';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);

  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(EmotionEntity)
    private readonly emotionRepository: Repository<EmotionEntity>,
  ) {}

  async getAllBoards(): Promise<BoardEntity[]> {
    this.logger.debug('getAllBoards');
    const boards: BoardEntity[] = await this.boardRepository.find({relations: ['emotions']});
    this.logger.debug(JSON.stringify(boards));
    return boards;
  }

  async getBoard(id: number): Promise<BoardEntity> {
    this.logger.debug('getBoard');
    const board: BoardEntity = await this.boardRepository.findOne({
      where: { id: id },
      relations: ['emotions'],
    });
    return board;
  }

  async createBoard(authorEmail: string, body: any): Promise<BoardEntity> {
    this.logger.debug('createBoard');

    const authorId: number = (
      await this.userRepository.findOne({ where: { email: authorEmail } })
    ).id;

    const newBoard: BoardEntity = new BoardEntity();
    newBoard.authorId = authorId;
    newBoard.title = body.title;
    newBoard.description = body.description;
    newBoard.content = body.content;
    newBoard.tags = JSON.stringify(body.tags);
    newBoard.status = body.status as BoardStatus;
    this.logger.debug(JSON.stringify(newBoard));

    return await this.boardRepository.save(newBoard);
  }

  async updateBoard(
    id: number,
    authorEmail: string,
    body: any,
  ): Promise<BoardEntity> {
    this.logger.debug('updateBoard');

    const authorId: number = (
      await this.userRepository.findOne({ where: { email: authorEmail } })
    ).id;
    const board = await this.boardRepository.findOne({
      where: { id: id, authorId: authorId },
    });

    if (board == null) {
      throw new Error('board Errorfound');
    }

    board.title = body.title;
    board.description = body.description;
    board.content = body.content;
    board.tags = JSON.stringify(body.tags);
    board.status = body.status as BoardStatus;
    this.logger.debug(JSON.stringify(board));

    return await this.boardRepository.save(board);
  }

  async deleteBoard(id: number, authorEmail: string): Promise<ApiResponse> {
    this.logger.debug('deleteBoard');

    const authorId: number = (
      await this.userRepository.findOne({ where: { email: authorEmail } })
    ).id;
    await this.boardRepository.delete({ id: id, authorId: authorId });

    return { code: 200, message: 'delete board success' } as ApiResponse;
  }

  async updateEmotion(
    boardId: number,
    userEmail: string,
    emotion: Emotion,
  ): Promise<ApiResponse> {
    this.logger.debug('updateEmotion');

    const userId: number = (
      await this.userRepository.findOne({ where: { email: userEmail } })
    ).id;

    const emotions: EmotionEntity[] = await this.emotionRepository.find({
      where: { boardId: boardId, userId: userId, emotion: emotion },
    });

    if (!(emotions == null || emotions.length == 0)) {
      await this.emotionRepository.remove(emotions[0]);
      return { code: 200, message: 'remove emotion success' } as ApiResponse;
    }

    const emotionEntity: EmotionEntity = new EmotionEntity();
    emotionEntity.boardId = boardId;
    emotionEntity.userId = userId;
    emotionEntity.emotion = emotion;

    await this.emotionRepository.save(emotionEntity);
    return { code: 200, message: 'add emotion success' } as ApiResponse;
  }
}
