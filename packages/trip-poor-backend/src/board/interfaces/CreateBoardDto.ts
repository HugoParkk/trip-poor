import { ApiProperty } from '@nestjs/swagger';
import { BoardStatus } from '../../utils/enum/boardStatus';
import { IsArray, IsEnum, IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ description: '게시글 제목', default: 'testTitle' })
  @IsString()
  title: string;
  @ApiProperty({ description: '게시글 설명', default: 'testDescription' })
  @IsString()
  content: string;
  @ApiProperty({ description: '게시글 태그', default: '["test","testTag"]' })
  @IsArray()
  tags: string[];
  @ApiProperty({ description: '게시글 상태', default: 'public' })
  @IsEnum(BoardStatus)
  status: BoardStatus;
}
