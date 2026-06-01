import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class DeleteImageDto {
  @ApiProperty({})
  url!: string;
}

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiPropertyOptional({
    default: 'general',
  })
  folder?: string;
}