import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateConsultationDto {
  @ApiPropertyOptional({ enum: ['pending', 'answered', 'closed'] })
  @IsOptional()
  @IsIn(['pending', 'answered', 'closed'])
  status?: string;

  @ApiPropertyOptional({ example: 'با مشتری تماس گرفته شد' })
  @IsOptional()
  @IsString()
  adminNotes?: string;
}