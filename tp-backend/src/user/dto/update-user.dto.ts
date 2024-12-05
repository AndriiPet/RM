import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/entity/role.entity';
import { TradingPoint } from '../../tradintPoint/entity/tradingPoint.entity';
import { Trip } from '../../trip/entity/trip.entity';
import { IsBoolean, IsOptional, IsString, IsEmail, IsArray, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  ipn?: string;

  @ApiProperty({
    description: 'Display name of the user',
  })
  @IsString()
  @IsOptional()
  displayName?: string;

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
    description: 'Last latitude of user',
  })
  @IsString()
  @IsOptional()
  lastLatitude?: string;

  @ApiProperty({
    description: 'Last longitude of user',
  })
  @IsString()
  @IsOptional()
  lastLongitude?: string;

  @ApiProperty({
    description: 'Flag indicating if the user is manager',
  })
  @IsBoolean()
  @IsOptional()
  isManager?: boolean;

  @ApiProperty({
    description: 'Work region IDs of the user',
    type: [Number],
    isArray: true,
  })
  @IsArray()
  @IsOptional()
  workRegionIds?: number[];

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsOptional()
  role?: number;

  @ApiProperty()
  @IsOptional()
  manager?: number;
}
