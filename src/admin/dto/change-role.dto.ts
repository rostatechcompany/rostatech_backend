import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../schemas/admin.schema';

export class ChangeRoleDto {
  @ApiProperty({ 
    enum: AdminRole, 
    example: AdminRole.SUPER_ADMIN,
  })
  @IsEnum(AdminRole)
  @IsNotEmpty()
  role!: AdminRole;
}