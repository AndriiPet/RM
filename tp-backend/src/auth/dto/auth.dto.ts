import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthSingInDto {
  @ApiProperty({
    example: 'user@eurocommerce.biz',
    description: 'Email',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @ApiProperty({
    example: 'Password123',
    description: 'User password',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
