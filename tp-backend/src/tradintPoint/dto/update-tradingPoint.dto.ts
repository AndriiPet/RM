import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTradingPointDto {
  @ApiProperty({
    description: 'Id of user who serves the trading point',
  })
  @IsOptional()
  @IsNumber()
  user?: number;

  @ApiProperty({
    description: 'Id of customer who serves the trading point',
  })
  @IsOptional()
  @IsNumber()
  customer?: number;

  @ApiProperty({
    description: 'Id of workRegion',
  })
  @IsNotEmpty()
  @IsNumber()
  workRegion: number;

  @ApiProperty({
    description: 'Name of the trading point',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Adress of the trading point',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Latitude of trading point',
  })
  @IsString()
  @IsOptional()
  latitude?: string;

  @ApiProperty({
    description: 'Longitude of trading point',
  })
  @IsString()
  @IsOptional()
  longitude?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
