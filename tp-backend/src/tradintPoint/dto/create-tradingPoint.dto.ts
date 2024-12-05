import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateTradingPointDto {
  @ApiProperty({
    description: 'Id of user who serves the trading point',
  })
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @ApiProperty({
    description: 'Id of customer who serves the trading point',
  })
  @IsNotEmpty()
  @IsNumber()
  customer: number;

  @ApiProperty({
    description: 'Id of workRegion',
  })
  @IsNotEmpty()
  @IsNumber()
  workRegion: number;

  @ApiProperty({
    description: 'Name of the trading point',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

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
