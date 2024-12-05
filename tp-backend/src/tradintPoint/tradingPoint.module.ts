import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradingPoint } from './entity/tradingPoint.entity';
import { TradingPointService } from './tradingPoint.service';
import { TradingPointController } from './tradingPoint.controller';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TradingPoint, User])],
  providers: [TradingPointService],
  exports: [TradingPointService],
  controllers: [TradingPointController],
})
export class TradingPointModule {}
