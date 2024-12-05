import { Module, forwardRef } from '@nestjs/common';
import { Trip } from './entity/trip.entity';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/user.module';
import { WorkRegion } from '../workRegion/entity/workRegion.entity';
import { VisitModule } from '../visit/visit.module';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, User]), VisitModule, UsersModule],
  providers: [TripService],
  exports: [TripService],
  controllers: [TripController],
})
export class TripModule {}
