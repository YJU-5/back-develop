import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperationDecorator } from 'src/decorator/api.operration.decorator';
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperationDecorator(
    '게시판 Get',
    '# 게시판 Get',
    200,
    '성공적으로 게시판 Get',
  )
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @ApiOperationDecorator(
    '게시판 Create',
    '# 게시판 Create',
    200,
    '성공적으로 게시판 Create',
  )
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @ApiOperationDecorator(
    '게시판 Get by ID',
    '# 게시판 Get by ID',
    200,
    '성공적으로 게시판 Get by ID',
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @ApiOperationDecorator(
    '게시판 Update',
    '# 게시판 Update',
    200,
    '성공적으로 게시판 Update',
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @ApiOperationDecorator(
    '게시판 Delete',
    '# 게시판 Delete',
    200,
    '성공적으로 게시판 Delete',
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
