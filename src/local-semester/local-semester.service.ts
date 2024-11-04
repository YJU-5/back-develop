import { Injectable } from '@nestjs/common';
import { CreateLocalSemesterDto } from './dto/create-local-semester.dto';
import { UpdateLocalSemesterDto } from './dto/update-local-semester.dto';

@Injectable()
export class LocalSemesterService {
  create(createLocalSemesterDto: CreateLocalSemesterDto) {
    return 'This action adds a new localSemester';
  }

  findAll() {
    return `This action returns all localSemester`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localSemester`;
  }

  update(id: number, updateLocalSemesterDto: UpdateLocalSemesterDto) {
    return `This action updates a #${id} localSemester`;
  }

  remove(id: number) {
    return `This action removes a #${id} localSemester`;
  }
}
