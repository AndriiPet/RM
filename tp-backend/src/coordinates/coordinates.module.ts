import { Module } from '@nestjs/common';
import { CoordinatesService } from './coordinates.service';
import { CoordinatesController } from './coordinates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinate } from './entity/coordinats.entity';
import { CoordinateGateway } from './coordinates.gateway';
import { User } from '../user/entity/user.entity';
import { Trip } from '../trip/entity/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coordinate, Trip])],
  providers: [CoordinatesService, CoordinateGateway],
  exports: [CoordinatesService, CoordinateGateway],
  controllers: [CoordinatesController],
})
export class CoordinatesModule {}
