import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/boardEntity.entity';
import { Repository } from 'typeorm';
import { BoardStatus } from '../utils/enum/boardStatus';
import { EmotionEntity } from '../entities/emotionEntity.entity';
import { Emotion } from '../utils/enum/emotion';
import { ApiResponse } from 'src/utils/ApiResponse';
import { UserEntity } from 'src/entities/userEntity.entity';
import { CommentDto } from './interfaces/CommentDto';
import { CommentEntity } from 'src/entities/commentEntity.entity';

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

    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async getAllBoards(): Promise<BoardEntity[]> {
    this.logger.debug('getAllBoards');
    const boards: BoardEntity[] = await this.boardRepository.find({
      relations: ['emotions', 'comments'],
    });
    this.logger.debug(JSON.stringify(boards));
    return boards;
  }

  async getBoard(id: number): Promise<BoardEntity> {
    this.logger.debug('getBoard');
    const board: BoardEntity = await this.boardRepository.findOne({
      where: { id: id },
      relations: ['emotions', 'comments'],
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

  async getComments(boardId: number): Promise<any> {
    this.logger.debug('getComments');

    const board: BoardEntity = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['comments'],
    });

    return board.comments;
  }

  async addComment(
    boardId: number,
    userEmail: string,
    comment: CommentDto,
  ): Promise<CommentEntity> {
    this.logger.debug('addComment');

    const userId: number = (
      await this.userRepository.findOne({ where: { email: userEmail } })
    ).id;

    const board: BoardEntity = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (board == null) {
      throw new Error('board not found');
    }

    if (comment.parentId == null) {
      // 부모없는 댓글의 경우
      const commentsRef = await this.commentRepository
        .createQueryBuilder()
        .select('NVL(MAX(ref), 0) as ref')
        .where('boardId = :boardId', { boardId: boardId })
        .getRawOne()
        .then((result) => {
          return result.ref;
        });

      const newComment: CommentEntity = new CommentEntity();
      newComment.content = comment.content;
      newComment.userId = userId;
      newComment.boardId = board.id;
      newComment.ref = commentsRef + 1;
      newComment.refOrder = 0;
      newComment.step = 0;
      newComment.answerNum = 0;
      newComment.parentId = null;

      return await this.commentRepository.save(newComment);
    } else {
      // 부모있는 댓글(대댓글)의 경우
      const parentComment: CommentEntity = await this.commentRepository.findOne(
        { where: { id: comment.parentId } },
      );
      const parentResult = await this.commentRefOrderAndUpdate(parentComment);

      if (parentResult == null) {
        throw new Error('부모댓글이 없습니다.');
      }

      const newComment: CommentEntity = new CommentEntity();
      newComment.content = comment.content;
      newComment.userId = userId;
      newComment.boardId = board.id;
      newComment.ref = parentComment.ref;
      newComment.refOrder = parentResult;
      newComment.step = parentComment.step + 1;
      newComment.answerNum = 0;
      newComment.parentId = comment.parentId;

      const savedComment = await this.commentRepository.save(newComment);

      await this.commentRepository
        .createQueryBuilder()
        .update()
        .set({ answerNum: parentComment.answerNum + 1 })
        .where('id = :id', { id: comment.parentId })
        .execute();

      return savedComment;
    }
  }

  async updateComment(
    userEmail: string,
    commentId: number,
    updateComment: CommentDto,
  ) {
    this.logger.debug('updateComment');

    const userId: number = (
      await this.userRepository.findOne({ where: { email: userEmail } })
    ).id;

    const comment: CommentEntity = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (comment.userId != userId) {
      return { code: 400, message: 'invalid user' } as ApiResponse;
    }

    comment.content = updateComment.content;
    await this.commentRepository.save(comment);

    return { code: 200, message: 'update comment success' } as ApiResponse;
  }

  async deleteComment(
    commentId: number,
    userEmail: string,
  ): Promise<ApiResponse> {
    this.logger.debug('deleteComment');

    const userId: number = (
      await this.userRepository.findOne({ where: { email: userEmail } })
    ).id;

    const comment: CommentEntity = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (comment.userId != userId) {
      return { code: 400, message: 'invalid user' } as ApiResponse;
    }

    await this.commentRepository.delete({ id: commentId });

    return { code: 200, message: 'delete comment success' } as ApiResponse;
  }

  private async commentRefOrderAndUpdate(
    comment: CommentEntity,
  ): Promise<number> {
    const saveStep: number = comment.step + 1;
    const refOrder = comment.refOrder;
    const ref = comment.ref;
    const answerNum = comment.answerNum;

    const answerNumSum: number = await this.commentRepository
      .createQueryBuilder()
      .select('SUM(answerNum) as sum')
      .where('ref = :ref', { ref: ref })
      .getRawOne()
      .then((result) => {
        return result.sum;
      });
    const maxStep: number = await this.commentRepository
      .createQueryBuilder()
      .select('MAX(step) as max')
      .where('ref = :ref', { ref: ref })
      .getRawOne()
      .then((result) => {
        return result.max;
      });

    if (saveStep < maxStep) {
      return (await answerNumSum) + 1;
    } else if (saveStep == maxStep) {
      this.commentRepository
        .createQueryBuilder()
        .update()
        .set({ refOrder: refOrder + 1 })
        .where('ref = :ref', { ref: ref })
        .andWhere('refOrder > :refOrder', { refOrder: refOrder + answerNum })
        .execute();

      return (await refOrder) + answerNum + 1;
    } else if (saveStep > maxStep) {
      this.commentRepository
        .createQueryBuilder()
        .update()
        .set({ refOrder: refOrder + 1 })
        .where('ref = :ref', { ref: ref })
        .andWhere('refOrder > :refOrder', { refOrder: refOrder + answerNum })
        .execute();

      return (await refOrder) + 1;
    }

    return null;
  }
}
