import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorkRegionDto {
  @ApiProperty({
    description: 'Name of the region',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Longitude of the region' })
  @IsString()
  @IsOptional()
  longitude?: string;

  @ApiProperty({ description: 'Latitude of the region' })
  @IsString()
  @IsOptional()
  latitude?: string;
}
