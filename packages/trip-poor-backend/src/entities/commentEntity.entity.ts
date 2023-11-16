import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardEntity } from './boardEntity.entity';

@Entity('Comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '자식 댓글 수', default: 0 })
  @Column({ default: 0 })
  @IsNumber()
  answerNum: number;

  @ApiProperty({ description: '댓글 참조(그룹) 번호', default: 0 })
  @Column()
  @IsNumber()
  ref: number;

  @ApiProperty({ description: '댓글 순서', default: 0 })
  @Column({ default: 0 })
  @IsNumber()
  refOrder: number;

  @ApiProperty({ description: '댓글 깊이(계층)', default: 0 })
  @Column({ default: 0 })
  @IsNumber()
  step: number;

  @ApiProperty({ description: '댓글 내용', default: 'testComment' })
  @Column()
  @IsString()
  content: string;

  @ManyToOne(() => BoardEntity, (board) => board.comments, {})
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  board: BoardEntity;

  @ApiProperty({ description: '상위 댓글 ID', default: 1 })
  @Column({ nullable: true, default: null })
  @IsNumber()
  @IsOptional()
  parentId: number | null;

  @ApiProperty({ description: '게시글 고유 번호', default: 1 })
  @Column()
  @IsNumber()
  boardId: number;

  @ApiProperty({ description: '댓글을 추가한 유저 ID', default: 1 })
  @Column()
  @IsNumber()
  userId: number;
}
