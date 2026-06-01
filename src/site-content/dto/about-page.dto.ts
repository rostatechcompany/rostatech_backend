import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAboutPageDto {
  @ApiPropertyOptional({ example: 'درباره ما' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Quill Delta JSON' })
  @IsOptional()
  @IsObject()
  delta?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}