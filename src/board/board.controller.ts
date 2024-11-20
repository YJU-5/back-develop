import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperationDecorator } from '../decorator/api.operration.decorator';
import { Board } from './entities/board.entity';
import { S3Service } from '../s3/s3.service';
import { ApiFile } from '../decorator/api.file.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly s3Service: S3Service,
  ) {}

  // 게시글 생성
  @ApiOperationDecorator(
    '게시판 Post',
    '# 게시판 Post',
    201,
    '성공적으로 게시판 Post',
  )
  // 게시글 생성 및 이미지 업로드
  @Post('')
  @ApiFile()
  async uploadFile(
    @Body() CreateBoardDto: CreateBoardDto, // 여기다 작업해보기
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    // array가 될 uploadedUrls
    let uploadedUrls: string[] = [];
    if (files) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    }
    return this.boardService.create(CreateBoardDto, uploadedUrls);
  }

  // 업데이트
  @ApiOperationDecorator(
    '게시판 Update',
    '# 게시판 Update',
    200,
    '성공적으로 게시판 Update',
  )
  @Patch(':id')
  @ApiFile()
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    let uploadedUrls: string[] = [];
    if (files) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    }
    return this.boardService.update(id, updateBoardDto, uploadedUrls);
  }

  // 페이지네이션 GET
  @ApiOperationDecorator(
    '게시판 페이지네이션',
    '# 게시판 페이지네이션',
    200,
    '성공적으로 게시판 페이지네이션',
  )
  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Board>> {
    limit = limit > 100 ? 100 : limit;
    return this.boardService.paginate({
      page,
      limit,
      route: 'localhost:3001/board',
    });
  }

  // 게시글 가져오기 By Id
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
