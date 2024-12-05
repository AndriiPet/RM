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
import { Transform, Type } from 'class-transformer';
import { CreatePhotoDto } from '../../photo/dto/create-photo.dto';

export class UpdateVisitDto {
  @ApiProperty({
    description: 'Id of the trip',
  })
  @IsOptional()
  @IsNumber()
  trip?: number;

  @ApiProperty({
    description: 'Id of the trading point',
  })
  @IsOptional()
  @IsNumber()
  tradingPoint?: number;

  @ApiProperty({
    description: 'Flag indicating if the visit is completed',
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isVisited?: boolean;

  @ApiProperty({
    description: 'Flag indicating of the priority',
  })
  @IsBoolean()
  @IsOptional()
  isPriority?: boolean;

  @ApiProperty({
    description: 'Date of the visit',
  })
  @IsOptional()
  @Type(() => Date)
  visitDate?: Date;

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

export class combinedDtoUpdateVisit {
  @ApiProperty({ type: UpdateVisitDto })
  @ValidateNested()
  @Type(() => UpdateVisitDto)
  updateVisitDto: UpdateVisitDto;

  @ApiProperty({ type: [CreatePhotoDto] })
  @ValidateNested({ each: true })
  @Type(() => CreatePhotoDto)
  @IsArray()
  createPhotoDto: CreatePhotoDto;
}
