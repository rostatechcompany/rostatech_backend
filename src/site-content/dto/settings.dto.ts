import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, IsObject, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SocialLinkDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  url!: string;
}

export class UpdateSettingsDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  shortDescription?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional() @IsArray()
  phoneNumbers?: string[];

  @ApiPropertyOptional({ type: [SocialLinkDto] })
  @IsOptional() @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks?: SocialLinkDto[];

  @ApiPropertyOptional()
  @IsOptional() @IsNumber()
  projectsCount?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsNumber()
  satisfactionRate?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsNumber()
  partnerCompaniesCount?: number;
}