import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { WorkRegion } from '../workRegion/entity/workRegion.entity';
import { UserWorkRegion } from '../userWorkRegion/entity/userWorkRegion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WorkRegion, UserWorkRegion])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
