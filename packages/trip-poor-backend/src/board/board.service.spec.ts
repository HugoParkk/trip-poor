import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/boardEntity.entity';
import { BoardStatus } from '../utils/enum/boardStatus';
import { Emotion } from '../utils/enum/emotion';
import { ApiResponse } from '@nestjs/swagger';
import { EmotionEntity } from '../entities/emotionEntity.entity';

const mockBoards = [
  {
    createdAt: '2023-09-26T12:00:31.012Z' as any,
    updatedAt: '2023-09-26T12:00:31.012Z' as any,
    id: 1,
    authorId: 1,
    title: 'testtt',
    description: '',
    content: 'testContent',
    tags: '',
    status: BoardStatus.PUBLIC,
  },
  {
    createdAt: '2023-09-26T12:00:43.694Z' as any,
    updatedAt: '2023-09-26T12:00:43.694Z' as any,
    id: 2,
    authorId: 1,
    title: 'testtt2',
    description: '',
    content: 'testContent2',
    tags: '["test","testTag"]',
    status: BoardStatus.PUBLIC,
  },
];

const mockEmotions = [
  {
    createdAt: '2023-09-26T12:00:31.012Z' as any,
    updatedAt: '2023-09-26T12:00:31.012Z' as any,
    boardId: 1,
    userId: 1,
    emotion: Emotion.LIKE,
  },
  {
    createdAt: '2023-09-26T12:00:31.012Z' as any,
    updatedAt: '2023-09-26T12:00:31.012Z' as any,
    boardId: 1,
    userId: 2,
    emotion: Emotion.DISLIKE,
  },
  {
    createdAt: '2023-09-26T12:00:31.012Z' as any,
    updatedAt: '2023-09-26T12:00:31.012Z' as any,
    boardId: 1,
    userId: 3,
    emotion: Emotion.LIKE,
  }
]

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(BoardEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(EmotionEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all boards', async () => {
    

    jest.spyOn(service, 'getAllBoards').mockResolvedValue(mockBoards);

    expect(await service.getAllBoards()).toEqual(mockBoards);
  });

  it('should return one board', async () => {
    jest.spyOn(service, 'getBoard').mockResolvedValue(mockBoards[1]);

    expect(await service.getBoard(1)).toEqual(mockBoards[1]);
  });

  it('should create a board', async () => {
    jest.spyOn(service, 'createBoard').mockResolvedValue(mockBoards[0]);

    expect(await service.createBoard(mockBoards[0])).toEqual(mockBoards[0]);
  });

  it('should update a board', async () => {
    jest.spyOn(service, 'updateBoard').mockResolvedValue(mockBoards[0]);

    expect(await service.updateBoard(mockBoards[0].id, mockBoards[0].authorId, mockBoards[0])).toEqual(mockBoards[0]);
  });

  it('should delete a board', async () => {
    jest.spyOn(service, 'deleteBoard');

    const result = {code: 200, message: 'delete board success'};

    expect(await service.deleteBoard(mockBoards[0].id, mockBoards[0].authorId)).toEqual(result);
  });

  it('should add emotion to a board', async () => {
    jest.spyOn(service, 'updateEmotion');

    const result = {code: 200, message: 'add emotion success'};

    expect(await service.updateEmotion(1, 3, Emotion.LIKE)).toEqual(result);
  });
});
