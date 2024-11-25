import { Injectable } from '@nestjs/common';
import { CreateLocalSemesterDto } from './dto/create-local-semester.dto';
import { UpdateLocalSemesterDto } from './dto/update-local-semester.dto';
import { LocalSemester } from './entities/local-semester.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
@Injectable()
export class LocalSemesterService {
  constructor(
    @InjectRepository(LocalSemester)
    private readonly localRepository: Repository<LocalSemester>,
    private readonly s3Service: S3Service,
  ) {}

  // 현지학기 생성
  async create(
    createLocalSemesterDto: CreateLocalSemesterDto,
    uploadedUrl: string[],
  ): Promise<LocalSemester> {
    const newLocalSemester = this.localRepository.create({
      title: createLocalSemesterDto.title,
      content: createLocalSemesterDto.content,
      imageUrl: uploadedUrl,
    });
    const saveLocalSemester = await this.localRepository.save(newLocalSemester);
    return saveLocalSemester;
  }

  // 현지학기 스케줄 전부 가져오기
  async findAll(): Promise<LocalSemester[]> {
    const LocalSemesterAllList = await this.localRepository.find();
    return LocalSemesterAllList;
  }

  // ID로 스케줄 불러오기
  async findOne(id: string): Promise<LocalSemester> {
    const LocalSemesterByIdList = await this.localRepository.findOne({
      where: { id },
    });
    return LocalSemesterByIdList;
  }

  async update(
    id: string,
    updateLocalSemesterDto: UpdateLocalSemesterDto,
    uploadedUrl: string[],
  ): Promise<any> {
    // 기존 DB에 있는 aws URL과 비교하기 위해 정보를 가져온다
    const LocalSemester = await this.localRepository.findOneBy({ id });
    let existingImageUrls = updateLocalSemesterDto.existingImageUrls;
    if (typeof existingImageUrls === 'string') {
      existingImageUrls = [existingImageUrls];
    }
    // DB에 있는 aws URL과 현재 Body로 받은 aws URL정보 중 없는 URL이 있다면 그 URL만 추출한다
    if (existingImageUrls && existingImageUrls.length > 0) {
      const deleteUrl = LocalSemester.imageUrl.filter(
        (imageUrl) => !existingImageUrls.includes(imageUrl),
      );
      await this.s3Service.deleteFile(deleteUrl);
    }
    if (existingImageUrls && existingImageUrls.length > 0) {
      // existingImageUrls 이게 한글자씩 들어가게됨
      uploadedUrl = [...existingImageUrls, ...uploadedUrl]; //이미 존재하는 URL, 새로 aws에 게시된 url을 합친다
    }
    await this.localRepository.update(id, {
      title: updateLocalSemesterDto.title,
      content: updateLocalSemesterDto.content,
      imageUrl: uploadedUrl,
    });
    const LocalSemesterUpdated = this.localRepository.findOneBy({ id });
    return LocalSemesterUpdated;
  }

  async remove(id: string): Promise<void> {
    const LocalSemester = await this.localRepository.findOneBy({ id });
    await this.s3Service.deleteFile(LocalSemester.imageUrl);
    await this.localRepository.delete({ id });
  }
}
