import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entity/photo.entity';
import { Visit } from '../visit/entity/visit.entity';
import { VisitModule } from '../visit/visit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Visit])],
  providers: [PhotoService],
  exports: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
