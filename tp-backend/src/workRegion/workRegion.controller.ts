import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkRegionService } from './workRegion.service';
import { CreateWorkRegionDto } from './dto/create-workRegion.dto';
import { UpdateWorkRegionDto } from './dto/update-workRegion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WorkRegions')
@Controller('workRegion')
export class WorkRegionController {
  constructor(private readonly workRegionService: WorkRegionService) {}

  @Post()
  create(@Body() workRegionDto: CreateWorkRegionDto) {
    return this.workRegionService.create(workRegionDto);
  }

  @Get()
  findAll() {
    return this.workRegionService.findAll();
  }

  @Get('/withUser')
  findAllWithUSer() {
    return this.workRegionService.findAllWithUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workRegionService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() workRegionDto: UpdateWorkRegionDto) {
    return this.workRegionService.update(+id, workRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workRegionService.remove(+id);
  }
}
