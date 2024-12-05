import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTripDto {
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
