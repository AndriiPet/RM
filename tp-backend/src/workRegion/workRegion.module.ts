import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRegion } from './entity/workRegion.entity';
import { WorkRegionService } from './workRegion.service';
import { WorkRegionController } from './workRegion.controller';
import { UserWorkRegion } from '../userWorkRegion/entity/userWorkRegion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkRegion, UserWorkRegion])],
  providers: [WorkRegionService],
  exports: [WorkRegionService],
  controllers: [WorkRegionController],
})
export class WorkRegionModule {}
