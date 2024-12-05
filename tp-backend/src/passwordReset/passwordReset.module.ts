import { Module } from '@nestjs/common';
import { PasswordResetService } from './passwordReset.service';
import { PasswordResetController } from './passwordReset.controller';
import { PasswordReset } from './entity/paswordReset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset, User])],
  providers: [PasswordResetService],
  exports: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class PasswordResetModule {}
