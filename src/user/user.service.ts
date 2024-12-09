import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService, // 못 불러오는 이유가 무엇일까?
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    const createdUserName = await this.userRepository.findOneBy({
      name: createUserDto.name,
    });

    if (createdUser) {
      throw new ConflictException(
        '이미 해당 이메일로 등록된 계정이 존재합니다',
      );
    } else if (createdUserName) {
      throw new ConflictException(
        '이미 해당 이름으로 등록된 계정이 존재합니다',
      );
    } else {
      // 유저 비밀번호 암호화
      const hashedPassword = await this.hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;

      const newUser = this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      });

      const saveUser = await this.userRepository.save(newUser);
      return saveUser;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const findUser = await this.findUserByEmail(loginUserDto.email);
    if (findUser) {
      const token = await this.authService.validateUser(
        loginUserDto.password,
        findUser.name,
        findUser.password,
        findUser.email,
        findUser.id,
      );
      return { access_token: token };
    } else {
      throw new UnauthorizedException('해당 이메일로된 유저가 없습니다');
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // 이메일로 유저찾기 기능
  async findUserByEmail(userEmail: string) {
    const findUser = await this.userRepository.findOneBy({
      email: userEmail,
    });
    return findUser;
  }

  // Id로 유저찾기 기능
  async findUserById(userId: string) {
    const findUser = await this.userRepository.findOneBy({
      id: userId,
    });
    return findUser;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
