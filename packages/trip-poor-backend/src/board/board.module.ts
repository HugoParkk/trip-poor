import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardEntity } from '../entities/boardEntity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardService],
  controllers: [BoardController]
})
export class BoardModule {}
