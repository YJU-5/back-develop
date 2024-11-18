import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperationDecorator } from '../decorator/api.operration.decorator';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저생성
  @ApiOperationDecorator('유저생성', '# 유저생성', 201, '성공적으로 유저 생성')
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @ApiOperationDecorator(
    '유저로그인',
    '# 유저로그인',
    201,
    '성공적으로 유저 로그인',
  )
  @ApiBody({ type: LoginUserDto })
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') CreateUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.findOneById();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
