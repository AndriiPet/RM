import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoordinateDto } from './dto/create-coordinates.dto';
import { Coordinate } from './entity/coordinats.entity';
import { ErrorCode } from '../utils/error';
import { last } from 'rxjs';
import { Trip } from '../trip/entity/trip.entity';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectRepository(Coordinate)
    private coordinateRepository: Repository<Coordinate>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async create(createCoordinateDto: CreateCoordinateDto) {
    const userId = createCoordinateDto.user;
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
    const startOfDay = new Date(currentDate.getTime() - timezoneOffset);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate.getTime() - timezoneOffset);
    endOfDay.setHours(23, 59, 59, 999);
      
    const trip = await this.tripRepository.createQueryBuilder('trip')
    .where('trip.user = :userId', {userId})
    .andWhere('trip.startDate >= :startOfDay', { startOfDay })
    .andWhere('trip.startDate <= :endOfDay', { endOfDay })
    .getOne();

  if (!trip) {
    throw new NotFoundException({
      message: 'User has no trip today',
      code: ErrorCode.TRIP_NOT_FOUND,
    });
  }
    try {
      
      return await this.coordinateRepository.save(createCoordinateDto);
    } catch (err) {
      throw new InternalServerErrorException({
        message: 'Error saving',
        code: ErrorCode.COORDINATE_CREATE_FAILED,
      });
    }
  }

  async findByUserIdAndDate(userId: number, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const coordinates = await this.coordinateRepository
      .createQueryBuilder('coordinates')
      .where('coordinates.user = :userId', { userId })
      .andWhere('coordinates.date >= :startOfDay', { startOfDay })
      .andWhere('coordinates.date <= :endOfDay', { endOfDay })
      .orderBy('coordinates.date', 'ASC')
      .getMany();

    if (!coordinates) {
      throw new NotFoundException({
        message: 'Coordinates not found',
        code: ErrorCode.COORDINATES_NOT_FOUND,
      });
    }

    return coordinates;
  }

  async findByUserIdAndTime(userId: number, dateStart: Date, dateEnd: Date) {
    const coordinates = await this.coordinateRepository
      .createQueryBuilder('coordinates')
      .where('coordinates.user = :userId', { userId })
      .andWhere('coordinates.date >= :startOfDay', { dateStart })
      .andWhere('coordinates.date <= :endOfDay', { dateEnd })
      .orderBy('coordinates.date', 'ASC')
      .getMany();

    if (!coordinates) {
      throw new NotFoundException({
        message: 'Coordinates not found',
        code: ErrorCode.COORDINATES_NOT_FOUND,
      });
    }

    return coordinates;
  }

  async findLastCoordinates(id: number) {
    const coordinate = await this.coordinateRepository
      .createQueryBuilder('coordinates')
      .where('coordinates.user = :id', { id })
      .orderBy('coordinates.date', 'DESC')
      .getOne();

    if (!coordinate) {
      throw new NotFoundException({
        message: 'Coordinates not found',
        code: ErrorCode.COORDINATES_NOT_FOUND,
      });
    }
    console.log(coordinate);
    return {
      id: coordinate.user, 
      lastLongitude: coordinate.longitude, 
      lastLatitude: coordinate.latitude,
    };
  }
}
