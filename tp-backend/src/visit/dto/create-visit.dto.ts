import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVisitDto {
  @ApiProperty({
    description: 'Id of the trip',
  })
  @IsOptional()
  @IsNumber()
  trip: number;

  @ApiProperty({
    description: 'Id of the trading point',
  })
  @IsNotEmpty()
  @IsNumber()
  tradingPoint: number;

  @ApiProperty({
    description: 'Date of the visit',
  })
  @IsNotEmpty()
  @Type(() => Date)
  visitDate: Date;

  @ApiProperty({
    description: 'Date of the start',
  })
  @IsOptional()
  @Type(() => Date)
  timeStart?: Date;

  @ApiProperty({
    description: 'Date of the end',
  })
  @IsOptional()
  @Type(() => Date)
  timeEnd?: Date;

  @ApiProperty({
    description: 'Flag indicating if the visit priority',
  })
  @IsBoolean()
  @IsOptional()
  isPriority?: boolean;


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

  @ApiProperty({
    description: 'Comment for visit',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
