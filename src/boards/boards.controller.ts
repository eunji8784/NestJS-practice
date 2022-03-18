import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation-pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  //   @Get('/')
  //   getAllBoard(): Board[] {
  //     return this.boardsService.getAllBoards();
  //   }

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  //   @Get('/:id')
  //   getBoardById(@Param('id') id: string): Board {
  //     //(@Param() param[]: string[]) //params를 여러 개 받았을 경우
  //     return this.boardsService.getBoardById(id);
  //   }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  //   @Post()
  //   @UsePipes(ValidationPipe)
  //   createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //     return this.boardsService.createBoard(createBoardDto);
  //   }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  //   @Delete('/:id')
  //   deleteBoard(@Param('id') id: string): void {
  //     this.boardsService.deleteBoard(id);
  //   }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  //   @Patch('/:id/status')
  //   updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //   ): Board {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
