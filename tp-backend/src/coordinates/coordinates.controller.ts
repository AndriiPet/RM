import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoordinatesService } from './coordinates.service';
import { CreateCoordinateDto } from './dto/create-coordinates.dto';

@ApiTags('Coordinates')
@Controller('coordinates')
export class CoordinatesController {
  constructor(private readonly coordinatesService: CoordinatesService) {}


  @Get('/byUserAndDay')
  async findByUserIdAndDate(
    @Query('userId') userId: number | null,
    @Query('date') date: Date | null,
  ) {
    return this.coordinatesService.findByUserIdAndDate(userId, date);
  }

  @Get('/byUserAndDate')
  async findByUserIdAndTime(
    @Query('userId') userId: number | null,
    @Query('dateStart') dateStart: Date | null,
    @Query('dateEnd') dateEnd: Date | null,
  ) {
    return await this.coordinatesService.findByUserIdAndTime(userId, dateStart, dateEnd);
  }

}
