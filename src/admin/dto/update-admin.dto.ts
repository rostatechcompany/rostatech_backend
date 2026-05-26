import { IsString, IsEmail, IsEnum, MinLength, MaxLength, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../schemas/admin.schema';

export class UpdateAdminDto {
  @ApiProperty({ example: 'admin_john' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @ApiProperty({ enum: AdminRole, example: AdminRole.ADMIN })
  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}