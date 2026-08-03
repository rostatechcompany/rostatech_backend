import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches, IsOptional, IsUrl } from 'class-validator';

export class CreateContactRequestDto {
  @ApiProperty({ example: 'رضا احمدی'})
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  fullName!: string;

  @ApiProperty({ example: 'شرکت دانش بنیان پارس'})
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  businessName!: string;

  @ApiProperty({ example: 'نرم‌افزار'})
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  activityField!: string;

  @ApiProperty({ example: 'https://parscompany.ir', required: false })
  @IsOptional()
  @IsUrl({}, { message: 'لطفاً آدرس وب‌سایت معتبر وارد کنید' })
  @Length(0, 255)
  website?: string;

  @ApiProperty({ example: '09123456789'})
  @IsString()
  @IsNotEmpty()
  @Matches(/^0[0-9]{10}$/, { message: 'شماره تماس باید ۱۱ رقم و با صفر شروع شود' })
  phoneNumber!: string;
}