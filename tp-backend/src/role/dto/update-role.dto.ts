import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ description: 'Name of the role' })
  @IsString()
  @IsOptional()
  name?: string;
}
