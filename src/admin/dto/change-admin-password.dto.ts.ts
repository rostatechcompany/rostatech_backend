import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeAdminPasswordDto {
  @ApiProperty({ example: 'newPassword456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword!: string;
}