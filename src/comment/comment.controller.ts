import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperationDecorator } from 'src/decorator/api.operration.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 생성
  @ApiOperationDecorator(
    '댓글 Post',
    '# 댓글 Post',
    201,
    '성공적으로 댓글 Post',
  )
  // @Post(':id')
  // create(
  //   @Param('id') postId: string,
  //   @Body() createCommentDto: CreateCommentDto,
  // ) {
  //   return this.commentService.create(postId, createCommentDto);
  // }

  // @ApiOperationDecorator('댓글 Get', '# 댓글 Get', 200, '성공적으로 댓글 Get')
  // @Get()
  // findAll() {
  //   return this.commentService.findAll();
  // }

  // @ApiOperationDecorator(
  //   '댓글 Get by ID',
  //   '# 댓글 Get by ID',
  //   200,
  //   '성공적으로 댓글 Get by ID',
  // )
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }

  @ApiOperationDecorator(
    '댓글 Update',
    '# 댓글 Update',
    200,
    '성공적으로 댓글 Update',
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  // @ApiOperationDecorator(
  //   '댓글 Delete',
  //   '# 댓글 Delete',
  //   200,
  //   '성공적으로 댓글 Delete',
  // )
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentService.remove(+id);
  // }
}
