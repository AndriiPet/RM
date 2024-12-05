import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoordinateDto {
  @ApiProperty({
    description: 'Date of coordinates',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Longitude of user',
  })
  @IsNotEmpty()
  longitude: string;

  @ApiProperty({
    description: 'Latitude of user',
  })
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({
    description: 'User id',
  })
  @IsNotEmpty()
  @IsNumber()
  user: number;
}
