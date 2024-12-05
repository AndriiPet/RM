import { ApiProperty } from '@nestjs/swagger';

export class AuthSignInResponseDto {
  @ApiProperty({
    description: 'JWT access token',
  })
  access_token: string;
}
