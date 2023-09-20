import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {

  async getAllBoards() {
    
    return 'getAllBoards';
  }

  async createBoard(body: any) {
    return 'createBoard';
  }
}
