import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TradingPointService } from './tradingPoint.service';
import { CreateTradingPointDto } from './dto/create-tradingPoint.dto';
import { UpdateTradingPointDto } from './dto/update-tradingPoint.dto';
import { ApiTags } from '@nestjs/swagger';
import { TradingPoint } from './entity/tradingPoint.entity';
import { create } from 'domain';

@ApiTags('TradingPoints')
@Controller('tradingPoint')
export class TradingPointController {
  constructor(private readonly tradingPointService: TradingPointService) {}

  @Post()
  create(@Body() createTradingPointDto: CreateTradingPointDto) {
    return this.tradingPointService.create(createTradingPointDto);
  }

  @Get()
  findAll(@Query('userID') userid: string) {
    return this.tradingPointService.findAll(+userid);
  }

  @Get('allWithPagination')
  findAllWithPagination(@Query('userID') userid: string, @Query('page') page: number, @Query('limit') limit: number) {
    return this.tradingPointService.findAllWithPagination(+userid, page, limit);
  }

  @Get('Id')
  findOne(@Query('id') id: string, @Query('userID') userid: string) {
    return this.tradingPointService.findOne(+id, +userid);
  }

  @Get('/name')
  async findOneByName(@Query('name') name: string, @Query('userID') userid: string) {
    return this.tradingPointService.findOneByName(name, +userid);
  }

  @Get('tradingPoint')
  async findOneByUserId(@Query('userId') userId: number) {
    return this.tradingPointService.findTradingPointByUserId(userId);
  }

  @Get('tradingPoint/workRegion')
  async findTradingPointsByWorkRegion(@Query('workRegionId') workRegionId: string, @Query('userID') userID: string) {
    return this.tradingPointService.findTradingPointsByWorkRegion(+workRegionId, +userID);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradingPointDto: UpdateTradingPointDto) {
    return this.tradingPointService.update(+id, updateTradingPointDto);
  }

  @Delete('')
  remove(@Query('id') id: string, @Query('userID') userid: string) {
    return this.tradingPointService.remove(+id, +userid);
  }
}
