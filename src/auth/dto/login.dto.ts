import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin_ali' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'Ali123456' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}