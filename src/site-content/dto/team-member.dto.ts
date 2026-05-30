import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty()
  @IsString() @IsString()
  photoUrl!: string;

  @ApiProperty()
  @IsString() @IsString()
  fullName!: string;

  @ApiProperty()
  @IsString() @IsString()
  position!: string;
}

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {}