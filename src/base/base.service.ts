// base.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/s3/s3.service';
import { BaseEntity } from './entities/base.entity';

@Injectable()
export class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}
  @Inject(S3Service) private readonly s3Service: S3Service;

  // 파일 업로드 공통 처리
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return this.s3Service.uploadFile(file);
  }

  // 포스트 생성 (자식에서 Entity에 맞춰 사용)
  async create(createDto: any, uploadedUrl: string[]): Promise<any> {
    const newPost = this.repository.create({
      ...createDto,
      imageUrl: uploadedUrl,
    });
    return await this.repository.save(newPost);
  }

  // 모든 포스트 가져오기
  async findAll(): Promise<any[]> {
    return this.repository.find();
  }

  // ID로 포스트 가져오기
  async findOne(id: string): Promise<any> {
    return this.repository
      .createQueryBuilder('post')
      .select('*')
      .where({ id: id })
      .getRawMany();
  }

  // 포스트 업데이트
  async update(id: string, updateDto: any): Promise<any> {
    console.log(id, updateDto);
    // await this.repository.update(id, updateDto);
    // return this.repository.find({ id });
  }

  // 포스트 삭제
  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
