import { IsEnum, IsNumber, IsString } from "class-validator";
import { BaseEntity } from "src/utils/base.entity";
import { BoardStatus } from "src/utils/enum/boardStatus.enum";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Board')
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsNumber()
  authorId: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  content: string;

  @Column()
  @IsString()
  tags: string;

  @Column()
  @IsEnum(BoardStatus)
  status: BoardStatus;
}
