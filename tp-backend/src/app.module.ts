import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm, { connectionSource } from './config/typeorm';
import { WorkRegionModule } from './workRegion/workRegion.module';
import { VisitModule } from './visit/visit.module';
import { UsersModule } from './user/user.module';
import { TradingPointModule } from './tradintPoint/tradingPoint.module';
import { RoleModule } from './role/role.module';
import { PhotoModule } from './photo/photo.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { PasswordResetModule } from './passwordReset/passwordReset.module';
import { CoordinatesModule } from './coordinates/coordinates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
      dataSourceFactory: async () => connectionSource.initialize(),
    }),
    AppModule,
    AuthModule,
    CustomerModule,
    PhotoModule,
    RoleModule,
    TradingPointModule,
    UsersModule,
    VisitModule,
    WorkRegionModule,
    TripModule,
    PasswordResetModule,
    CoordinatesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
