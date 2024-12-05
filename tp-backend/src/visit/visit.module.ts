import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './entity/visit.entity';
import { UsersModule } from '../user/user.module';
import { TripModule } from '../trip/trip.module';
import { TradingPointModule } from '../tradintPoint/tradingPoint.module';
import { PhotoModule } from '../photo/photo.module';
import { TradingPointService } from '../tradintPoint/tradingPoint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Visit]), UsersModule, PhotoModule, TradingPointModule],
  providers: [VisitService],
  exports: [VisitService],
  controllers: [VisitController],
})
export class VisitModule {}
