import { isString, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ description: 'Id of the visit' })
  @IsNotEmpty()
  @IsNumber()
  visit: number;
}
