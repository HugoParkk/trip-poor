import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { of } from 'rxjs';

const mockBoards = [
  {
    createdAt: '2023-09-26T12:00:31.012Z',
    updatedAt: '2023-09-26T12:00:31.012Z',
    id: 1,
    authorId: 1,
    title: 'testtt',
    description: '',
    content: 'testContent',
    tags: '',
    status: 'public',
  },
  {
    createdAt: '2023-09-26T12:00:43.694Z',
    updatedAt: '2023-09-26T12:00:43.694Z',
    id: 2,
    authorId: 1,
    title: 'testtt2',
    description: '',
    content: 'testContent2',
    tags: '["test","testTag"]',
    status: 'public',
  },
];

describe('BoardController', () => {
  let controller: BoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        {
          provide: BoardService,
          useValue: {
            getAllBoards: jest.fn(() => of(mockBoards)),
          },
        },
      ],
    }).compile();

    controller = module.get<BoardController>(BoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
