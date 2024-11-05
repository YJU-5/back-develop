import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  //포스트 생성
  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const newBoardPost = this.boardRepository.create({
      title: createBoardDto.title,
      content: createBoardDto.content,
    });
    const saveBoardPost = await this.boardRepository.save(newBoardPost);
    return saveBoardPost;
  }

  // 전체 post 불러오기
  async findAll(): Promise<Board[]> {
    const BoardPostAllList = await this.boardRepository.find();
    console.log(BoardPostAllList);
    return BoardPostAllList;
  }

  //ID로 포스트 불러오기
  async findOne(id: string): Promise<Board> {
    const BoardPostByIdList = await this.boardRepository.findOneBy({ id: id });
    console.log(BoardPostByIdList);
    return BoardPostByIdList;
  }

  // 업데이트
  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    await this.boardRepository.update(id, updateBoardDto);
    const updateBoardPosts = await this.boardRepository.findOneBy({ id });
    return updateBoardPosts;
  }

  // 삭제
  async remove(id: string): Promise<void> {
    await this.boardRepository.delete({ id });
  }
}
