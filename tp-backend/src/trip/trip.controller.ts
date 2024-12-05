import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TripService } from './trip.service';
import { CombinedDto } from './dto/create-trip.dto';

@ApiTags('Trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  createTrip(@Body() combinedDto: CombinedDto) {
    const { createTripDto, createVisitTripDto = [] } = combinedDto;

    return this.tripService.createTrip(createTripDto, createVisitTripDto);
  }

  @Get()
  async getAll() {
    return this.tripService.getTrips();
  }

  @Get('id/:id')
  async getTripById(@Param('id') id: string) {
    return await this.tripService.getTripById(+id);
  }

  @Get('/byUserDateAndRegion')
  async getTripForUser(
    @Query('userId') userId: string | null,
    @Query('date') date: Date | null,
    @Query('workRegion') workRegion: number | null,
  ) {
    return await this.tripService.getTripForUser(+userId, date, +workRegion);
  }

  @Get('/getTripForManager')
  async getTripForManager(
    @Query('managerId') managerId: string | null,
    @Query('userId') userId: string | null,
    @Query('date') date: Date | null,
    @Query('workRegion') workRegion: number | null,
  ) {
    return await this.tripService.getTripForManager(+managerId, +userId, date, +workRegion);
  }

  @Get('/getCurrentTripForUser')
  async getCurrentTripForUser(@Query('userId') userId: string | null, @Query('date') date: Date | null) {
    return await this.tripService.getCurrentTripForUser(+userId, date);
  }
}
