// board.controller.ts
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Controller('board')
export class BoardController extends BaseController<Board> {
  constructor(private readonly boardService: BoardService) {
    super(boardService); // 부모 서비스 전달
  }

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFiles() files: Express.Multer.File[],
    @UploadedFile() file: Express.Multer.File,
  ) {
    // 여기서 자식 컨트롤러에서 추가 작업을 할 수 있습니다.
    console.log('Board post is being created...');
    // 부모 메서드를 호출
    return super.create(createBoardDto, files, file);
  }
}
