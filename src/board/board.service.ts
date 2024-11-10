// board.service.ts
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService extends BaseService<Board> {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    // private readonly s3Service: S3Service,
  ) {
    super(boardRepository); // 부모 생성자 호출 시 BoardRepository 전달
  }
  // 부모 서비스(BaseService)의 메서드를 그대로 사용하거나,
  // 자식만의 특별한 로직을 여기에 작성할 수 있습니다.

  // 예시: 추가적인 메서드가 필요한 경우
  async customMethod() {
    // 자식 서비스에서만 필요한 로직
    return 'This is a custom method in BoardService';
  }
}
