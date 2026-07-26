import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator'; 

export class ChangeUsernameDto {
  @ApiProperty({
    example: 'amir_new_username',
    description: 'نام کاربری جدید',
  })
  @IsString()
  @MinLength(3)
  username!: string;
}