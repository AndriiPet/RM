import { isString, IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User Identifier (ipn)' })
  @IsNotEmpty()
  @IsString()
  ipn: string;

  @ApiProperty({
    description: 'Display name of the user',
  })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiProperty()
  @IsOptional()
  role?: number;

  @ApiProperty()
  @IsOptional()
  manager?: number;
}
