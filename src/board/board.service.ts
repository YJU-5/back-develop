import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { S3Service } from '../s3/s3.service';
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

  // 포스트 생성
  async create(
    createBoardDto: CreateBoardDto,
    uploadedUrl: string[],
  ): Promise<Board> {
    const newBoardPost = this.boardRepository.create({
      title: createBoardDto.title,
      content: createBoardDto.content,
      imageUrl: uploadedUrl,
    });
    const saveBoardPost = await this.boardRepository.save(newBoardPost);
    return saveBoardPost;
  }

  // 전체 post 불러오기
  async findAll(): Promise<Board[]> {
    const BoardPostAllList = await this.boardRepository.find();
    return BoardPostAllList;
  }

  //ID로 포스트 불러오기
  async findOne(id: string): Promise<Board> {
    const BoardPostByIdList = await this.boardRepository.findOne({
      where: { id },
      relations: ['comments'], // 댓글내용 []형식으로 불러오기
    });
    return BoardPostByIdList;
  }

  // 업데이트
  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
    uploadedUrl: string[],
  ): Promise<Board> {
    const BoardPost = await this.boardRepository.findOneBy({ id });
    let existingImageUrls = updateBoardDto.existingImageUrls;
    if (typeof existingImageUrls === 'string') {
      existingImageUrls = [existingImageUrls];
    }

    if (existingImageUrls && existingImageUrls.length > 0) {
      const deleteUrl = BoardPost.imageUrl.filter(
        (imageUrl) => !existingImageUrls.includes(imageUrl),
      );
      await this.s3Service.deleteFile(deleteUrl);
    }

    if (existingImageUrls && existingImageUrls.length > 0) {
      uploadedUrl = [...existingImageUrls, ...uploadedUrl];
    }
    await this.boardRepository.update(id, {
      title: updateBoardDto.title,
      content: updateBoardDto.content,
      imageUrl: uploadedUrl,
    });
    const BoardUpdated = this.boardRepository.findOneBy({ id });
    return BoardUpdated;
  }

  // 삭제
  async remove(id: string): Promise<void> {
    const BoardPost = await this.boardRepository.findOneBy({ id });
    await this.s3Service.deleteFile(BoardPost.imageUrl);
    await this.boardRepository.delete({ id });
  }

  // 아이디로 포스트 찾기
  async findBoardById(postId: string): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id: postId });
    return board;
  }

  // 페이지네이션
  async paginate(options: IPaginationOptions): Promise<Pagination<Board>> {
    return paginate<Board>(this.boardRepository, options);
  }
}
