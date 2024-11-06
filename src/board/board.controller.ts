import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperationDecorator } from 'src/decorator/api.operration.decorator';
import { Board } from './entities/board.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { S3Service } from 'src/s3/s3.service';
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly s3Service: S3Service,
  ) {}

  // post 생성
  @ApiOperationDecorator(
    '게시판 Post',
    '# 게시판 Post',
    201,
    '성공적으로 게시판 Post',
  )
  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto);
  }

  // 이미지 업로드
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadedUrl = await this.s3Service.uploadFile(file);
    return { url: uploadedUrl };
  }

  // 모든 posts 가져오기
  @ApiOperationDecorator(
    '게시판 Get',
    '# 게시판 Get',
    200,
    '성공적으로 게시판 Get',
  )
  @Get()
  findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  // 가져오기 By Id
  @ApiOperationDecorator(
    '게시판 Get by ID',
    '# 게시판 Get by ID',
    200,
    '성공적으로 게시판 Get by ID',
  )
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Board> {
    return this.boardService.findOne(id);
  }

  // 업데이트
  @ApiOperationDecorator(
    '게시판 Update',
    '# 게시판 Update',
    200,
    '성공적으로 게시판 Update',
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardService.update(id, updateBoardDto);
  }

  // 삭제
  @ApiOperationDecorator(
    '게시판 Delete',
    '# 게시판 Delete',
    200,
    '성공적으로 게시판 Delete',
  )
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.boardService.remove(id);
  }
}
