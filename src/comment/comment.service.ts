import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    // 보드에 기능 넣고 불러오기
    // @InjectRepository(Board)
    // private readonly boardRepository: Repository<Board>,
  ) {}

  // 댓글 생성
  // async create(postId: string, createCommentDto: CreateCommentDto) {
  //   const board = await this.boardRepository.findOneBy({ id: postId });
  //   console.log(board);
  //   const newComment = this.commentRepository.create({
  //     postId: board,
  //     content: createCommentDto.content,
  //   });
  //   const saveNewComment = await this.commentRepository.save(newComment);
  //   return saveNewComment;
  // }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
