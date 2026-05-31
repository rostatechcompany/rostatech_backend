import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional, IsUrl, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePortfolioDto {
  @ApiProperty({ example: 'https://example.com/desktop.jpg' })
  @IsString() @IsNotEmpty()
  desktopImageUrl!: string;

  @ApiProperty({ example: 'https://example.com/mobile.jpg' })
  @IsString() @IsNotEmpty()
  mobileImageUrl!: string;

  @ApiProperty({ example: 'پروژه فروشگاهی' })
  @IsString() @IsNotEmpty()
  projectName!: string;

  @ApiProperty({ example: 'توضیحات کامل پروژه...' })
  @IsString() @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: ['React', 'Node.js', 'MongoDB'] })
  @IsArray() @ArrayNotEmpty() @IsString({ each: true })
  technologies!: string[];

  @ApiPropertyOptional({ example: 'https://project-website.com' })
  @IsOptional() @IsString()
  websiteUrl!: string;

  @ApiProperty({ example: ['60d5f484f1a2c8b1f8e4e1a1', '60d5f484f1a2c8b1f8e4e1a2'] })
  @IsArray() @ArrayNotEmpty() @IsMongoId({ each: true })
  teamMemberIds!: string[];
}