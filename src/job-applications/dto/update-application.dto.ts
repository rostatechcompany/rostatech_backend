import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicationDto {
  @ApiPropertyOptional({ enum: ['pending', 'accepted', 'rejected'] })
  @IsOptional()
  @IsIn(['pending', 'accepted', 'rejected'])
  status?: string;

  @IsOptional()
  @IsString()
  adminNotes?: string;
}