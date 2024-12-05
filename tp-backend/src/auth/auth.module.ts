import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';

dotenvConfig({ path: '.env' });
const secret = process.env.SECRET;
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: '10h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
