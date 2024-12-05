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
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { ApiTags } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@ApiTags('Photo')
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
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
    }),
  )
  async createPhoto(@Param('id') visitId: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.photoService.create(visitId, file);
  }

  @Get(':id/photo')
  async getProfilePhoto(@Param('id') id: string, @Res() res: Response) {
    return this.photoService.findPhoto(+id, res);
  }

  @Get(':visitId')
  async findPhotos(@Param('visitId') visitId: number) {
    const photos = await this.photoService.findPhotos(visitId);
    return photos;
  }
}
