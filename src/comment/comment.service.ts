import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { BoardService } from '../board/board.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly boardService: BoardService,
  ) {}

  // 댓글 생성
  async create(postId: string, createCommentDto: CreateCommentDto) {
    const board = await this.boardService.findBoardById(postId);
    const newComment = this.commentRepository.create({
      postId: board,
      content: createCommentDto.content,
    });
    const saveNewComment = await this.commentRepository.save(newComment);
    return saveNewComment;
  }

  async findAll() {
    const CommentList = await this.commentRepository.find();
    return CommentList;
  }

  // async findOne(id: string) {
  //   const CommentByIdList = await this.commentRepository.findOneById(id);
  //   return CommentByIdList;
  // }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    await this.commentRepository.update(id, {
      content: updateCommentDto.content,
    });
    const updatedComment = this.commentRepository.findOneBy({ id });
    return updatedComment;
  }

  remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}
