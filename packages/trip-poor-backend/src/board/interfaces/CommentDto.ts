import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class CommentDto {
  @ApiProperty({ description: '부모 댓글 ID', default: null })
  @IsNumber()
  @IsOptional()
  parentId: number;

  @ApiProperty({ description: '댓글 내용', default: 'testComment' })
  @IsString()
  content: string;

  @ApiProperty({ description: '댓글 참조(그룹) 번호', default: 0 })
  @IsNumber()
  ref: number;

  @ApiProperty({ description: '댓글 깊이(계층)', default: 0 })
  @IsNumber()
  step: number;

}