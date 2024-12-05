import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkRegionDto {
  @ApiProperty({ description: 'Name of the region' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Longitude of the region' })
  @IsString()
  longitude: string;

  @ApiProperty({ description: 'Latitude of the region' })
  @IsString()
  latitude: string;
}
