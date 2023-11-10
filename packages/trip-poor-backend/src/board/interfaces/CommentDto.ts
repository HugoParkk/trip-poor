import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty({ description: '부모 댓글 ID', default: null })
  @IsNumber()
  @IsOptional()
  parentId: number;

  @ApiProperty({ description: '댓글 내용', default: 'testComment' })
  @IsString()
  content: string;
}
