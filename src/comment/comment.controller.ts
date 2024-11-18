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
    '# 댓글 Post : id에 Board의 ID를 넣어주는 것으로 구현',
    201,
    '성공적으로 댓글 Post',
  )
  @Post(':id')
  create(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(postId, createCommentDto);
  }
// https://nestjs-image-bucket.s3.ap-northeast-2.amazonaws.com/41ffb160-a8bb-4825-8f80-f4c0547fd077-%C3%AA%C2%B9%C2%80%C3%AD%C2%98%C2%95%C3%AC%C2%84%C2%A0010-%203727-0989.jpg
// https://nestjs-image-bucket.s3.ap-northeast-2.amazonaws.com/41ffb160-a8bb-4825-8f80-f4c0547fd077-%C3%AA%C2%B9%C2%80%C3%AD%C2%98%C2%95%C3%AC%C2%84%20010-%203727-0989.jpg
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

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
