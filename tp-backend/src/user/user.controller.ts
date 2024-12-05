import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetVisitsDto } from './dto/get-visit-time.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entity/user.entity';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { UpdateUserRegistrationDto } from './dto/update-user-registration';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('allWithPagination')
  async findAllWithPagination(@Query('page') page: number, @Query('limit') limit: number) {
    return this.userService.findAllWithPagination(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('user/managers')
  async findAllManagers() {
    return this.userService.findAllManagers();
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.userService.findByName(name);
  }

  @Get(':id/profile-photo')
  async getProfilePhoto(@Param('id') id: string, @Res() res: Response) {
    return this.userService.findProfilePhoto(+id, res);
  }

  @Get(':userId/visits')
  async getAllVisitsForUser(@Param('userId') userId: number) {
    return this.userService.getAllVisitsForUser(userId);
  }

  @Get('visited-per-month/:userId')
  async getVisitedVisitsPerMonth(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return await this.userService.getVisitedVisitsPerMonth(userId, start, end);
  }

  @Get('visited-previous-month/:userId')
  async getVisitedVisitsStats(@Param('userId', ParseIntPipe) userId: number, @Query('date') date: string) {
    const start = new Date(date);
    return await this.userService.getVisitedVisitsStats(userId, start);
  }

  @Get('user/subordinatesInRegion')
  async subordanatesInRegion(@Query('region') region: number, @Query('managerId') managerId: number) {
    return await this.userService.subordinatesInRegion(region, managerId);
  }

  @Get('getSubordinatesByRegion/:userId')
  async getSubordinatesByRegion(@Param('userId') userId: string) {
    return await this.userService.getSubordinatesByRegion(+userId);
  }

  @Get('getVisitSubordinatesByManager/:userId')
  async getVisitByManagerAndByRegion(@Param('userId') userId: string) {
    return await this.userService.getVisitByManagerAndByRegion(+userId);
  }

  @Get('getSubordinates/:managerId')
  async restructureDataUserCentric(@Param('managerId') managerId: string) {
    return await this.userService.restructureDataUserCentric(+managerId);
  }

  @Get('getAllSubordinates/:managerId')
  async getAllSubordinates(@Param('managerId') managerId: string) {
    return await this.userService.getAllSubordinates(+managerId);
  }

  @Get('user/getUsersWithoutRegion')
  async getUsersWithoutRegion() {
    return await this.userService.getUsersWithoutRegion();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('ipn/:ipn')
  updateByIpn(@Param('ipn') ipn: string, @Body() updateUserDto: UpdateUserRegistrationDto) {
    return this.userService.updateByIpn(ipn, updateUserDto);
  }

  @Patch(':id/profile-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateProfilePhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.userService.updateUserProfilePhoto(+id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
