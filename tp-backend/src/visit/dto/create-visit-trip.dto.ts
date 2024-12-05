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

export class CreateVisitTripDto {
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
    description: 'Flag indicating if the visit priority',
  })
  @IsBoolean()
  @IsOptional()
  isPriority?: boolean;

  @ApiProperty({
    description: 'Comment for visit',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
