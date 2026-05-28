import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultationDto {
  @ApiProperty({ example: 'رضا عیاران' })
  @IsString() @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ example: '09123456789' })
  @IsString() @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ example: 'name@example.com' })
  @IsEmail() @IsNotEmpty()
  email?: string;

  @ApiProperty({ example: 'طراحی سایت فروشگاهی' })
  @IsString() @IsNotEmpty()
  subject!: string;

  @ApiProperty({ example: 'ما یک شرکت بازرگانی هستیم و نیاز به یک سایت فروشگاهی داریم...' })
  @IsString() @IsNotEmpty()
  message?: string;
}