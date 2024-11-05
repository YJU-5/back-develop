import { Injectable } from '@nestjs/common';
import { CreateLocalSemesterDto } from './dto/create-local-semester.dto';
import { UpdateLocalSemesterDto } from './dto/update-local-semester.dto';
import { LocalSemester } from './entities/local-semester.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class LocalSemesterService {
  constructor(
    @InjectRepository(LocalSemester)
    private readonly localRepository: Repository<LocalSemester>,
  ) {}

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
