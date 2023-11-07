import { IsEnum, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from '../utils/base.entity';
import { BoardStatus } from '../utils/enum/boardStatus';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EmotionEntity } from './emotionEntity.entity';
import { CommentEntity } from './commentEntity.entity';

@Entity('Board')
export class BoardEntity extends BaseEntity {
  @ApiProperty({ description: '게시글 고유 번호', default: 1 })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '게시글 작성자 고유 번호', default: 1 })
  @Column()
  @IsNumber()
  authorId: number;

  @ApiProperty({ description: '게시글 제목', default: 'testTitle' })
  @Column()
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 설명', default: 'testDescription' })
  @Column({ default: '' })
  @IsString()
  description: string;

  @ApiProperty({ description: '게시글 내용', default: 'testContent' })
  @Column()
  @IsString()
  content: string;

  @ApiProperty({ description: '게시글 태그', default: '["test","testTag"]' })
  @Column({ default: '' })
  @IsString()
  tags: string;

  @ApiProperty({ description: '게시글 상태', default: 'public' })
  @Column()
  @IsEnum(BoardStatus)
  status: BoardStatus;

  // @ApiProperty({ description: '게시글 감정', default: 'public' })
  @OneToMany(() => EmotionEntity, (emotion) => emotion.board, {})
  @JoinColumn({ name: 'id', referencedColumnName: 'boardId' })
  emotions: EmotionEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.board, {})
  @JoinColumn({ name: 'id', referencedColumnName: 'boardId' })
  comments: CommentEntity[];
}
