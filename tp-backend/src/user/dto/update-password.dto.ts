import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  ipn?: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
