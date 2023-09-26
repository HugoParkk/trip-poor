import { ApiProperty } from '@nestjs/swagger';
import { BoardStatus } from 'src/utils/enum/boardStatus.enum';

export class CreateBoardDto {
  @ApiProperty({ description: '게시글 작성자 고유 번호', default: 1 })
  authorId: number;
  @ApiProperty({ description: '게시글 제목', default: 'testTitle' })
  title: string;
  @ApiProperty({ description: '게시글 설명', default: 'testDescription' })
  content: string;
  @ApiProperty({ description: '게시글 태그', default: '["test","testTag"]' })
  tags: string[];
  @ApiProperty({ description: '게시글 상태', default: 'public' })
  Status: BoardStatus;
}
