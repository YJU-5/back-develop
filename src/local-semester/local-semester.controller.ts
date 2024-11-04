import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalSemesterService } from './local-semester.service';
import { CreateLocalSemesterDto } from './dto/create-local-semester.dto';
import { UpdateLocalSemesterDto } from './dto/update-local-semester.dto';
import { ApiOperationDecorator } from 'src/decorator/api.operration.decorator';

@Controller('local-semester')
export class LocalSemesterController {
  constructor(private readonly localSemesterService: LocalSemesterService) {}

  @ApiOperationDecorator(
    '현지학기소개 Create',
    '# 현지학기소개 Create',
    200,
    '성공적으로 현지학기소개 Create',
  )
  @Post()
  create(@Body() createLocalSemesterDto: CreateLocalSemesterDto) {
    return this.localSemesterService.create(createLocalSemesterDto);
  }

  @ApiOperationDecorator(
    '현지학기소개 Get',
    '# 현지학기소개 Get',
    200,
    '성공적으로 현지학기소개 Get',
  )
  @Get()
  findAll() {
    return this.localSemesterService.findAll();
  }

  @ApiOperationDecorator(
    '현지학기소개 Get by ID',
    '# 현지학기소개 Get by ID',
    200,
    '성공적으로 현지학기소개 Get by ID',
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localSemesterService.findOne(+id);
  }

  @ApiOperationDecorator(
    '현지학기소개 Update',
    '# 현지학기소개 Update',
    200,
    '성공적으로 현지학기소개 Update',
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocalSemesterDto: UpdateLocalSemesterDto,
  ) {
    return this.localSemesterService.update(+id, updateLocalSemesterDto);
  }

  @ApiOperationDecorator(
    '현지학기소개 Delete',
    '# 현지학기소개 Delete',
    200,
    '성공적으로 현지학기소개 Delete',
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localSemesterService.remove(+id);
  }
}
