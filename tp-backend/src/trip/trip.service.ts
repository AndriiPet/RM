import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NumericType, Repository } from 'typeorm';

import { Trip } from './entity/trip.entity';
import { User } from '../user/entity/user.entity';
import { WorkRegion } from '../workRegion/entity/workRegion.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { VisitService } from '../visit/visit.service';
import { CreateVisitDto } from '../visit/dto/create-visit.dto';
import { ErrorCode } from '../utils/error';
import { CreateVisitTripDto } from '../visit/dto/create-visit-trip.dto';
import { UserService } from 'src/user/user.service';
import { TradingPoint } from 'src/tradintPoint/entity/tradingPoint.entity';
import e from 'express';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly visitService: VisitService,

    private readonly userService: UserService,
  ) {}

  async createTrip(createTripDto: CreateTripDto, createVisitDto: CreateVisitTripDto[]): Promise<Trip> {
    const queryRunner = this.tripRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { user, workRegion } = createTripDto;

      const userObject = await queryRunner.manager.findOne(User, {
        where: { id: user },
      });
      if (!userObject) {
        throw new NotFoundException({
          message: 'User not found',
          code: ErrorCode.USER_NOT_FOUND,
        });
      }

      const workRegionObject = await queryRunner.manager.findOne(WorkRegion, {
        where: { id: workRegion },
      });
      if (!workRegionObject) {
        throw new NotFoundException({
          message: 'Work region not found',
          code: ErrorCode.WORK_REGION_NOT_FOUND,
        });
      }

      const trip_exce = await queryRunner.manager.findOne(Trip, {
        where: {
          user: user,
          startDate: createTripDto.startDate,
        },
      });
      if (trip_exce) {
        throw new BadRequestException({
          message: 'Trip already exist',
          code: ErrorCode.TRIP_ALREADY_EXIST,
        });
      }

      const trip = queryRunner.manager.create(Trip, {
        ...createTripDto,
        user: user,
        workRegion: workRegion,
      });

      const savedTrip = await queryRunner.manager.save(Trip, trip);
      if (createVisitDto && createVisitDto.length > 0) {
        await Promise.all(
          createVisitDto.map(async (visit) => {
            visit.trip = savedTrip.id;
            await this.visitService.create(visit, queryRunner.manager);
          }),
       );
      }

      await queryRunner.commitTransaction();
      return trip;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error.message);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getTrips(): Promise<Trip[]> {
    const trips = await this.tripRepository.find();
    if (!trips) {
      throw new NotFoundException({
        message: 'No trips found',
        code: ErrorCode.TRIP_NOT_FOUND,
      });
    }
    return trips;
  }

  async getTripById(id: number): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: ['visits'],
    });
    if (!trip) {
      throw new NotFoundException({
        objectOrError: {
          message: 'No trips found',
          code: ErrorCode.TRIP_NOT_FOUND,
        },
      });
    }
    return trip;
  }

  async getTripForManager(
    managerId: number | null,
    userId: number | null,
    date: Date | null,
    workRegion: number | null,
  ): Promise<any[]> {
    let userIds: number[] = [];

    if (userId !== null && !isNaN(userId)) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (user) userIds.push(user.id);
    } else if (managerId !== null && !isNaN(managerId)) {
      const manager = await this.userRepository.findOne({ where: { id: managerId } });
      const users = await this.userService.findAllSubordinates(manager);
      userIds = users.map((user) => user.id);
    }

    if (!userIds.length) {
      throw new NotFoundException({
        message: 'Users not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    const queryBuilder = this.tripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.user', 'user')
      .leftJoinAndSelect('trip.workRegion', 'workRegion')
      .leftJoinAndSelect('trip.visits', 'visits')
      .leftJoinAndSelect('visits.tradingPoint', 'tradingPoint')
      .where('trip.user_id IN (:...userIds)', { userIds })
      .orderBy('trip.startDate', 'DESC');

    const dateDate = new Date(date);
    if (dateDate !== null && !isNaN(dateDate.getTime())) {
      const startDate = new Date(dateDate.getFullYear(), dateDate.getMonth(), dateDate.getDate());
      const endDate = new Date(dateDate.getFullYear(), dateDate.getMonth(), dateDate.getDate() + 1);
      queryBuilder.andWhere('trip.startDate >= :startDate AND trip.startDate < :endDate', { startDate, endDate });
    }

    if (workRegion !== null && !isNaN(workRegion)) {
      queryBuilder.andWhere('trip.workRegion = :workRegion', { workRegion });
    }

    const trips = await queryBuilder.getMany();

    if (!trips.length) {
      throw new NotFoundException({
        message: 'No trips found',
        code: ErrorCode.TRIP_NOT_FOUND,
      });
    }

    const result = trips.map((trip) => ({
      id: trip.id,
      startDate: trip.startDate,
      created_at: trip.created_at,
      updated_at: trip.updated_at,
      visits: trip.visits,
      workRegion: trip.workRegion,
      user: trip.user,
    }));

    return result;
  }

  async getTripForUser(userId: number | null, date: Date | null, workRegion: number | null): Promise<Trip> {
    const queryBuilder = this.tripRepository.createQueryBuilder('trip');

    if (userId !== null) {
      const userObject = await this.userRepository.findOne({ where: { id: userId } });
      if (!userObject) {
        throw new NotFoundException({
          message: 'User not found',
          code: ErrorCode.USER_NOT_FOUND,
        });
      }
      queryBuilder.andWhere('trip.user = :userId', { userId });
    }

    const dateDate = new Date(date);

    if (dateDate !== null && !isNaN(dateDate.getTime())) {
      const startDate = new Date(dateDate.getFullYear(), dateDate.getMonth(), dateDate.getDate());
      const endDate = new Date(dateDate.getFullYear(), dateDate.getMonth(), dateDate.getDate() + 1);
      queryBuilder.andWhere('trip.startDate >= :startDate AND trip.startDate < :endDate', { startDate, endDate });
    }
    if (workRegion !== null && !isNaN(workRegion)) {
      queryBuilder.andWhere('trip.workRegion = :workRegion', { workRegion });
    }

    const trip = await queryBuilder
      .leftJoinAndSelect('trip.visits', 'visits')
      .leftJoinAndSelect('visits.tradingPoint', 'tradingPoint')
      .orderBy('trip.startDate', 'DESC')
      .getOne();

    if (!trip) {
      throw new NotFoundException({
        message: 'No trips found',
        code: ErrorCode.TRIP_NOT_FOUND,
      });
    }

    return trip;
  }

  async getCurrentTripForUser(userId: number | null, date: Date | null) {
    const queryBuilder = this.tripRepository.createQueryBuilder('trip');

    if (userId !== null) {
      const userObject = await this.userRepository.findOne({ where: { id: userId } });
      if (!userObject) {
        throw new NotFoundException({
          message: 'User not found',
          code: ErrorCode.USER_NOT_FOUND,
        });
      }
      queryBuilder.andWhere('trip.user = :userId', { userId });
    }

    const date_New = new Date(date);
    if (date_New !== null) {
      const timezoneOffset = date_New.getTimezoneOffset() * 60000; // конвертуємо хвилини в мілісекунди
      const startOfDay = new Date(date_New.getTime() - timezoneOffset);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date_New.getTime() - timezoneOffset);
      endOfDay.setHours(23, 59, 59, 999);

      queryBuilder.andWhere('trip.startDate >= :startOfDay', { startOfDay });
      queryBuilder.andWhere('trip.startDate <= :endOfDay', { endOfDay });
    }

    const trip = await queryBuilder
      .leftJoinAndSelect('trip.visits', 'visits')
      .leftJoinAndSelect('visits.tradingPoint', 'tradingPoint')
      .orderBy('trip.startDate', 'DESC')
      .getOne();
    console.log(trip);
    if (!trip) {
      throw new NotFoundException({
        message: 'No trips found',
        code: ErrorCode.TRIP_NOT_FOUND,
      });
    }

    return trip;
  }
}
