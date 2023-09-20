import { BoardStatus } from "src/utils/enum/boardStatus.enum";

export interface CreateBoardDto {
  authorId: number;
  title: string;
  content: string;
  tags: string[];
  Status: BoardStatus;
}