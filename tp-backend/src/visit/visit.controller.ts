import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { CreatePhotoDto } from '../photo/dto/create-photo.dto';
import { ApiTags } from '@nestjs/swagger';
import { Visit } from './entity/visit.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Visit')
@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitService.createOne(createVisitDto);
  }

  @Get()
  findAll() {
    return this.visitService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.visitService.findOne(+id);
  }

  @Get('tripid/:tripId')
  findByTripId(@Param('tripId') tripId: number) {
    return this.visitService.findVisitByTripId(+tripId);
  }

  @Get('/byUserAndDate')
  findByUserAndDate(@Query('userId') userId: string | null, @Query('date') date: Date | null) {
    return this.visitService.getVisitByUserAndDate(+userId, date);
  }

  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitService.update(+id, updateVisitDto);
  }

  @Delete(':visitId/:userId')
  async removeVisit(@Param('userId') userId: number, @Param('visitId') visitId: number): Promise<void> {
    await this.visitService.remove(visitId, userId);
  }

  @Patch(':id/update-with-photos')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photos',
          maxCount: 10,
        },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async updateVisitAndAddPhotos(
    @Param('id') id: string,
    @Body() updateVisitDto: UpdateVisitDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    files: { photos?: Express.Multer.File[] },
  ) {
    console.log(updateVisitDto);
    return this.visitService.updateVisitAndAddPhotos(+id, updateVisitDto, files.photos || []);
  }
}
