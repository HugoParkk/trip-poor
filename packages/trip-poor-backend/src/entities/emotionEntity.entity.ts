import { BaseEntity } from '../utils/base.entity';
import { IsEnum, IsNumber } from 'class-validator';
import { Emotion } from '../utils/enum/emotion';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BoardEntity } from './boardEntity.entity';

@Entity('Emotion')
export class EmotionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '게시글 고유 번호', default: 1 })
  @Column()
  @IsNumber()
  boardId: number;

  @ApiProperty({ description: '반응을 추가한 유저 ID', default: 1 })
  @Column()
  @IsNumber()
  userId: number;

  @ManyToOne(() => BoardEntity, (board) => board.emotions, {})
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  board: BoardEntity;

  @ApiProperty({ description: '반응', default: Emotion.LIKE })
  @Column()
  @IsEnum(Emotion)
  emotion: Emotion;
}
