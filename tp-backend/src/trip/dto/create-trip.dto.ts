import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVisitDto } from 'src/visit/dto/create-visit.dto';
import { CreateVisitTripDto } from '../../visit/dto/create-visit-trip.dto';

export class CreateTripDto {
  @ApiProperty({
    description: 'Date of start trip',
  })
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({
    description: 'Id of the user',
  })
  @IsOptional()
  @IsNumber()
  user?: number;

  @ApiProperty({
    description: 'Id of the work region',
  })
  @IsOptional()
  @IsNumber()
  workRegion?: number;
}

export class CombinedDto {
  @ApiProperty({ type: CreateTripDto })
  @ValidateNested()
  @Type(() => CreateTripDto)
  createTripDto: CreateTripDto;

  @ApiProperty({ type: [CreateVisitTripDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateVisitTripDto)
  @IsOptional()
  createVisitTripDto?: CreateVisitTripDto[];
}
