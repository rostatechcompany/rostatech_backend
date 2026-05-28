import { IsString, IsEmail, IsNotEmpty, IsMongoId, ArrayNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobApplicationDto {
  @ApiProperty({ example: 'نام و نام‌خانوادگی' })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ example: '09123456789' })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ example: 'name@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '1370/05/15' })
  @IsString()
  @IsNotEmpty()
  birthDate!: string;

  @ApiProperty({ example: 'آدرس' })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ example: 'کارشناسی ارشد' })
  @IsString()
  @IsNotEmpty()
  degree!: string;

  @ApiProperty({ example: 'دانشگاه تهران' })
  @IsString()
  @IsNotEmpty()
  university!: string;

  @ApiProperty({ example: 'React, Node.js, MongoDB' })
  @IsString()
  skills!: string;

  @ApiProperty({ example: '۵ سال توسعه Frontend در شرکت X' })
  @IsString()
  workExperience!: string;

  @ApiProperty({ example: 'https://github.com/ali, https://sample.ir' })
  @IsString()
  portfolio!: string;

  @ApiProperty({example: ['60d5f484f1a2c8b1f8e4e1a1', '60d5f484f1a2c8b1f8e4e1a2'],})
  @IsArray()
  // @ArrayNotEmpty()
  @IsMongoId({ each: true })
  cooperationTypes!: string[];

  @ApiProperty({ example: 'برنامه‌نویس ارشد Frontend'})
  @IsNotEmpty()
  jobTitle!: string;
}