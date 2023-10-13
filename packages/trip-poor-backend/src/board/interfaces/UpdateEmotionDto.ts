import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Emotion } from "src/utils/enum/emotion";

export class UpdateEmotionDto {
  @ApiProperty({ description: '좋아요/싫어요 여부', default: 'like' })
  @IsEnum(Emotion)
  emotion: Emotion;
}