import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeOwnPasswordDto {
  @ApiProperty({ example: 'oldPassword123' })
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @ApiProperty({ example: 'newPassword456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword!: string;
}