import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAdminDto {
  @ApiProperty({ example: 'admin_ali' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username!: string;

  @ApiProperty({ example: 'Ali123456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'نام و نام‌خانوادگی' })
  @IsString()
  @IsNotEmpty()
  fullName!: string;
}