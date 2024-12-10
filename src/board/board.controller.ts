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
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperationDecorator } from '../decorator/api.operration.decorator';
import { Board } from './entities/board.entity';
import { S3Service } from '../s3/s3.service';
import { ApiFile } from '../decorator/api.file.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly s3Service: S3Service,
  ) {}

  // Get All Pagination 게시판
  // Get All Pagination Swagger 게시판 문서화
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
    limit = limit > 100 ? 100 : limit; // 한 번에 불러올 수 있는 limit 제한
    return this.boardService.paginate({
      page,
      limit,
      route: '',
    });
  }

  // Get By Id 게시판
  // Get By Id Swagger 게시판 문서화
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

  // Create 게시판
  // Create Swagger 문서화
  @ApiOperationDecorator(
    '게시판 Post',
    '# 게시판 Post',
    201,
    '성공적으로 게시판 Post',
  )
  @ApiFile()
  @Post('')
  async uploadFile(
    @Body() CreateBoardDto: CreateBoardDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    let uploadedUrls: string[] = [];
    if (files) {
      // Promise.all 비동기 작업을 동시에 병렬로 처리
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    }
    return this.boardService.create(CreateBoardDto, uploadedUrls);
  }

  // Update 게시판
  // Update 게시판 Swagger 문서화
  @ApiOperationDecorator(
    '게시판 Update',
    '# 게시판 Update',
    200,
    '성공적으로 게시판 Update',
  )
  @ApiFile()
  @Patch(':id')
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

  //Delete 게시판
  //Delete Swagger 문서화
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
