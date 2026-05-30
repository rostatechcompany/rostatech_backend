import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType  } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  imageUrl?: string;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}