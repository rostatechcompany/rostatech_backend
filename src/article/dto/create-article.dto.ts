import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsObject, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Quill Delta object' })
  @IsObject() @IsNotEmpty()
  delta: any;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  coverImageUrl?: string;

  @ApiPropertyOptional({ default: 3 })
  @IsOptional() @IsNumber()
  readingTime?: number;

  @ApiProperty()
  @IsMongoId() @IsNotEmpty()
  category!: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional() @IsBoolean()
  isActive?: boolean;
}