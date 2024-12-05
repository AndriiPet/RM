import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/entity/role.entity';
import { TradingPoint } from '../../tradintPoint/entity/tradingPoint.entity';
import { Trip } from '../../trip/entity/trip.entity';
import { IsBoolean, IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserRegistrationDto {
  @ApiProperty({
    description: 'Phone number of the user',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Email of the user with a specific domain requirement',
    required: false,
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsString()
  @IsOptional()
  password?: string;
}
