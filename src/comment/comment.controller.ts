import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperationDecorator } from '../decorator/api.operration.decorator';
import { ApiBody } from '@nestjs/swagger';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Create 댓글
  @ApiOperationDecorator(
    '댓글 Post',
    '# 댓글 Post : id에 Board의 ID를 넣어주는 것으로 구현',
    201,
    '성공적으로 댓글 Post',
  )
  @Post(':id')
  @ApiBody({ type: CreateCommentDto })
  create(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(postId, createCommentDto);
  }

  //Update 댓글
  @ApiOperationDecorator(
    '댓글 Update',
    '# 댓글 Update',
    200,
    '성공적으로 댓글 Update',
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  //Delete 댓글
  @ApiOperationDecorator(
    '댓글 Delete',
    '# 댓글 Delete',
    200,
    '성공적으로 댓글 Delete',
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
