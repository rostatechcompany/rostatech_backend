import { PartialType } from '@nestjs/swagger';
import { CreateCooperationTypeDto } from './create-cooperation-type.dto';

export class UpdateCooperationTypeDto extends PartialType(CreateCooperationTypeDto) {}