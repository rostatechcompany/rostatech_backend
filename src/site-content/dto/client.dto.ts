import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  logoUrl!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  companyName!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  collaborationDate?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  websiteUrl?: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}