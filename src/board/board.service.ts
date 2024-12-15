import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { S3Service } from '../s3/s3.service';
import { NotFoundException } from '@nestjs/common';

import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly s3Service: S3Service,
  ) {}

  // Get All Pagination 게시판
  async paginate(options: IPaginationOptions): Promise<Pagination<Board>> {
    // options : 컨트롤러에서 받아온 page, limit
    return paginate<Board>(this.boardRepository, options, {
      order: { updatedAt: 'DESC' },
    }); // 페이지네이트
  }

  // Get By Id 게시판
  async findOne(id: string): Promise<Board> {
    const BoardPostByIdList = await this.boardRepository.findOne({
      where: { id },
      relations: ['comments'], // 댓글참조
    });
    if (!BoardPostByIdList) {
      throw new NotFoundException('No Board records found');
    }
    return BoardPostByIdList;
  }

  // Create 게시판
  async create(
    createBoardDto: CreateBoardDto,
    uploadedUrl: string[],
  ): Promise<Board> {
    // create해서 객체를 생성
    const newBoardPost = this.boardRepository.create({
      title: createBoardDto.title,
      content: createBoardDto.content,
      imageUrl: uploadedUrl,
    });
    // 실제저장
    const saveBoardPost = await this.boardRepository.save(newBoardPost);
    return saveBoardPost;
  }

  // Update 게시판
  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
    uploadedUrl: string[],
  ): Promise<Board> {
    // 기존 DB에 있는 aws URL과 비교하기 위해 정보를 가져온다
    const BoardPost = await this.boardRepository.findOneBy({ id });
    const BoardPostImageUrl = BoardPost.imageUrl;
    let existingImageUrls = updateBoardDto.existingImageUrls;
    console.log(existingImageUrls);
    console.log(BoardPostImageUrl);
    // existingImageUrls이 string 일시에 배열로 변환
    if (typeof existingImageUrls === 'string') {
      existingImageUrls = [existingImageUrls];
    }
    // existingImageUrls 배열에 현재 imageUrl(DB에 있는 이미지URL)이 포함되어 있는지를 확인
    // 포함되지 않았다면 프론트에서 지웠다는 의미로 삭제할 deleteUrl에 넣어준다
    if (existingImageUrls && existingImageUrls.length > 0) {
      uploadedUrl = [...existingImageUrls, ...uploadedUrl]; // 합친놈
      // 삭제할 이미지 URL
      const deleteUrl = BoardPostImageUrl.filter(
        (imageUrl) => !existingImageUrls.includes(imageUrl),
      );
      await this.s3Service.deleteFile(deleteUrl);
    } else if (!existingImageUrls && BoardPostImageUrl.length > 0) {
      const deleteUrl = BoardPostImageUrl;
      await this.s3Service.deleteFile(deleteUrl);
    }
    // 업데이트 실행
    await this.boardRepository.update(id, {
      title: updateBoardDto.title,
      content: updateBoardDto.content,
      imageUrl: uploadedUrl,
    });
    const BoardUpdated = this.boardRepository.findOneBy({ id });
    return BoardUpdated;
  }

  //Delete 게시판
  async remove(id: string): Promise<void> {
    const BoardPost = await this.boardRepository.findOneBy({ id });
    await this.s3Service.deleteFile(BoardPost.imageUrl);
    await this.boardRepository.delete({ id });
  }

  // 아이디로 포스트 찾기
  // 다른 서비스나 컨트롤에서 쓰임
  async findBoardById(postId: string): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id: postId });
    return board;
  }
}
