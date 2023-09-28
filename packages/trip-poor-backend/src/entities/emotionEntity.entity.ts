import { BaseEntity } from "../utils/base.entity";
import { IsEnum, IsNumber } from "class-validator";
import { Emotion } from "../utils/enum/emotion";
import { Entity, PrimaryColumn } from "typeorm";

@Entity('Emotion')
export class EmotionEntity extends BaseEntity {
  @PrimaryColumn()
  @IsNumber()
  boardId: number;

  @PrimaryColumn()
  @IsNumber()
  userId: number;

  @IsEnum(Emotion)
  emotion: Emotion;
}