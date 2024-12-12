import { Injectable } from '@nestjs/common';
import { CreateLocalSemesterDto } from './dto/create-local-semester.dto';
import { UpdateLocalSemesterDto } from './dto/update-local-semester.dto';
import { LocalSemester } from './entities/local-semester.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LocalSemesterService {
  constructor(
    @InjectRepository(LocalSemester)
    private readonly localRepository: Repository<LocalSemester>,
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
  ) {}

  // Get All 현지학기
  async findAll(): Promise<LocalSemester[]> {
    const LocalSemesterAllList = await this.localRepository.find({
      relations: ['user'], // 현지학기 게시물 생성한 유저항목 불러오기
      order: {
        createdAt: 'DESC',
      },
    });
    return LocalSemesterAllList;
  }

  // ID로 상세가져오기
  async findOne(id: string): Promise<LocalSemester> {
    const LocalSemesterByIdList = await this.localRepository.findOne({
      where: { id },
      relations: ['user'], //유저참조
    });
    if (!LocalSemesterByIdList) {
      throw new NotFoundException('No LocalSemester records found');
    }
    return LocalSemesterByIdList;
  }

  // Create 현지학기
  async create(
    createLocalSemesterDto: CreateLocalSemesterDto,
    uploadedUrl: string[],
    userId: string, // 토큰에서 추출한 userId
  ): Promise<LocalSemester> {
    const user = await this.userService.findUserById(userId); // 유저 서비스에서 유저 찾기
    // 저장해줄 객체 생성
    const newLocalSemester = this.localRepository.create({
      title: createLocalSemesterDto.title,
      content: createLocalSemesterDto.content,
      imageUrl: uploadedUrl, //파일 URL삽입
      user: user, // 현재 로그인한 userId 추출하여 삽입
    });
    const saveLocalSemester = await this.localRepository.save(newLocalSemester); // 생성된 객체를 실제로 저장
    return saveLocalSemester; //저장된 정보 반환
  }

  // Update 현지학기
  async update(
    id: string,
    updateLocalSemesterDto: UpdateLocalSemesterDto,
    uploadedUrl: string[],
  ): Promise<any> {
    // 기존 DB에 있는 aws URL과 비교하기 위해 정보를 가져온다
    const LocalSemester = await this.localRepository.findOneBy({ id });
    const LocalSemesterImageUrl = LocalSemester.imageUrl;
    let existingImageUrls = updateLocalSemesterDto.existingImageUrls; // 프론트에서 원래있던 이미지URL
    // existingImageUrls이 string 일시에 배열로 변환
    if (typeof existingImageUrls === 'string') {
      existingImageUrls = [existingImageUrls];
    }
    // existingImageUrls 배열에 현재 imageUrl(DB에 있는 이미지URL)이 포함되어 있는지를 확인
    // 포함되지 않았다면 프론트에서 지웠다는 의미로 삭제할 deleteUrl에 넣어준다
    if (existingImageUrls && existingImageUrls.length > 0) {
      uploadedUrl = [...existingImageUrls, ...uploadedUrl]; // 이미 존재하는 URL, 새로 aws에 게시된 url을 합친다
      // 삭제할 이미지 URL
      const deleteUrl = LocalSemesterImageUrl.filter(
        (imageUrl) => !existingImageUrls.includes(imageUrl),
      );
      await this.s3Service.deleteFile(deleteUrl);
      // existingImageUrls가 완전 비었을 경우
    } else if (!existingImageUrls && LocalSemesterImageUrl.length > 0) {
      const deleteUrl = LocalSemesterImageUrl;
      await this.s3Service.deleteFile(deleteUrl);
    }
    // 업데이트 실행
    await this.localRepository.update(id, {
      title: updateLocalSemesterDto.title,
      content: updateLocalSemesterDto.content,
      imageUrl: uploadedUrl,
    });
    const LocalSemesterUpdated = this.localRepository.findOneBy({ id });
    return LocalSemesterUpdated;
  }

  // Delete 현지학기
  async remove(id: string): Promise<void> {
    const LocalSemester = await this.localRepository.findOneBy({ id });
    await this.s3Service.deleteFile(LocalSemester.imageUrl);
    await this.localRepository.delete({ id });
  }
}
