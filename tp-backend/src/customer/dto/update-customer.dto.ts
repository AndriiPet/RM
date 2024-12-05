import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiProperty({
    description: 'Name of the customer',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Phone number of customer',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
