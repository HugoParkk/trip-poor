import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardEntity } from "./boardEntity.entity";

@Entity('Comment')
export class CommentEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;
  
  @ApiProperty({ description: '게시글 고유 번호', default: 1 })
  @Column()
  @IsNumber()
  boardId: number;

  @ApiProperty({ description: '댓글을 추가한 유저 ID', default: 1 })
  @Column()
  @IsNumber()
  userId: number;

  @ManyToOne(() => BoardEntity, (board) => board.comments, {})
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  board: BoardEntity;

  @ApiProperty({ description: '상위 댓글 ID', default: 1 })
  @Column({ nullable: true, default: null })
  @IsNumber()
  parentId?: number;

  @ApiProperty({ description: '댓글 내용', default: 'testComment' })
  @Column()
  @IsString()
  content: string;

  
}