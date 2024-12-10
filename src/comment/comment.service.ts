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

  //Create 댓글
  async create(postId: string, createCommentDto: CreateCommentDto) {
    const board = await this.boardService.findBoardById(postId);
    const newComment = this.commentRepository.create({
      postId: board,
      content: createCommentDto.content,
    });
    const saveNewComment = await this.commentRepository.save(newComment);
    return saveNewComment;
  }

  //Update 댓글
  async update(id: string, updateCommentDto: UpdateCommentDto) {
    await this.commentRepository.update(id, {
      content: updateCommentDto.content,
    });
    const updatedComment = this.commentRepository.findOneBy({ id });
    return updatedComment;
  }

  //Delete 댓글
  async remove(id: string) {
    const deletedComment = await this.commentRepository.delete(id);
    return deletedComment;
  }
}
