import { PartialType } from '@nestjs/swagger';
import { CreateLocalSemesterDto } from './create-local-semester.dto';

export class UpdateLocalSemesterDto extends PartialType(CreateLocalSemesterDto) {}
