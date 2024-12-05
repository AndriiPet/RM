import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, Transaction } from 'typeorm';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { CreatePhotoDto } from '../photo/dto/create-photo.dto';
import { ErrorCode } from '../utils/error';
import { Visit } from './entity/visit.entity';
import { Trip } from '../trip/entity/trip.entity';
import { TradingPoint } from '../tradintPoint/entity/tradingPoint.entity';
import { UserService } from '../user/user.service';
import { PhotoService } from '../photo/photo.service';
import { CreateVisitTripDto } from './dto/create-visit-trip.dto';
import * as archiver from 'archiver';
import * as fs from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { error } from 'console';
import { TradingPointService } from '../tradintPoint/tradingPoint.service';
const pipelineAsync = promisify(pipeline);

@Injectable()
export class VisitService {
  logger: Logger;
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    private readonly userService: UserService,
    private readonly photoService: PhotoService,
    private readonly tradingPointService: TradingPointService,
  ) {
    this.logger = new Logger();
  }

  async createOne(createVisitDto: CreateVisitDto): Promise<Visit> {
    try {
      const existingVisit = await this.visitRepository
        .createQueryBuilder('visit')
        .where('visit.trip = :trip', { trip: createVisitDto.trip })
        .andWhere('visit.tradingPoint = :tradingPoint', { tradingPoint: createVisitDto.tradingPoint })
        .getOne();

      if (existingVisit) {
        throw new InternalServerErrorException({
          message: 'Visit to this trading point already exist',
          code: ErrorCode.VISIT_ALREADY_EXIST,
        });
      }
      const tradingPoint = await this.tradingPointService.findOne(createVisitDto.tradingPoint, 2);
      if (!tradingPoint) {
        throw new InternalServerErrorException({
          message: 'Trading point not found',
          code: ErrorCode.TRADING_POINT_NOT_FOUND,
        });
      }

      const newVisit = this.visitRepository.create({ ...createVisitDto, isVisited: false });
      const savedVisit = await this.visitRepository.save(newVisit);
      return this.visitRepository.findOne({ 
        where: { id: savedVisit.id },
        relations: ['tradingPoint', 'trip']
       });
      
    } catch (error) {
        throw new ConflictException({
          message: "Visit already exist",
          code: ErrorCode.VISIT_ALREADY_EXIST,
        });
    }
  }

  async create(createVisitTripDto: CreateVisitTripDto, transactionManager: EntityManager): Promise<Visit> {
    const { tradingPoint, trip } = createVisitTripDto;

    const [tradingPointObject, tripObject] = await Promise.all([
      transactionManager.findOne(TradingPoint, {
        where: { id: tradingPoint },
      }),
      transactionManager.findOne(Trip, {
        where: { id: trip },
      }),
    ]);

    if (!tradingPointObject) {
      throw new NotFoundException({
        message: 'Trading point is not found',
        code: ErrorCode.TRADING_POINT_NOT_FOUND,
      });
    }

    if (!tripObject) {
      throw new NotFoundException({
        message: 'Trip is not found',
        code: ErrorCode.TRIP_NOT_FOUND,
      });
    }

    const visit = transactionManager.create(Visit, {
      ...createVisitTripDto,
      isVisited: false,
      tradingPoint: tradingPoint,
      trip: trip,
    });

    return transactionManager.save(Visit, visit);
  }

  async findAll() {
    const visits = await this.visitRepository.find();
    if (!visits || visits.length === 0) {
      throw new NotFoundException({
        message: 'No visit found',
        code: ErrorCode.VISIT_NOT_FOUND,
      });
    }
    return visits;
  }

  async findOne(id: number) {
    const visit = await this.visitRepository.findOneBy({ id });
    if (!visit) {
      this.logger.error(`Visit with id: ${id} not found`);
      throw new NotFoundException({
        message: 'No visit found',
        code: ErrorCode.VISIT_NOT_FOUND,
      });
    }
    return visit;
  }

  async findVisitByTripId(tripId: number) {
    const visits = await this.visitRepository
      .createQueryBuilder('visit')
      .leftJoinAndSelect('visit.tradingPoint', 'tradingPoint')
      .where('visit.trip.id = :tripId', { tripId })
      .getMany();

    if (visits.length === 0) {
      throw new NotFoundException({
        message: 'No visits found for this trip',
        code: ErrorCode.VISIT_NOT_FOUND,
      });
    }
    return visits;
  }

  async update(id: number, updateVisitDto: UpdateVisitDto): Promise<Visit> {
    if (!Object.keys(updateVisitDto).length) {
      throw new BadRequestException({
        message: 'No update date provoded',
        code: ErrorCode.VISIT_NOT_FOUND,
      });
    }

    try {
      await this.visitRepository.update({ id }, updateVisitDto);
      return await this.visitRepository.findOne({ where: { id } });
    } catch (error) {
      console.error('Error upadting visit: ' + error);
      throw new InternalServerErrorException({
        message: 'Error saving visit : ' + error.message,
        code: ErrorCode.VISIT_UPDATE_FAILED,
      });
    }
  }

  async getVisitByUserAndDate(userId: number | null, date: Date | null) {
    const queryBuilder = this.visitRepository
      .createQueryBuilder('visit')
      .leftJoinAndSelect('visit.trip', 'trip')
      .leftJoinAndSelect('trip.user', 'user');

    if (userId !== null) {
      queryBuilder.andWhere('user.id = :userId', { userId });
    }

    const dateDate = new Date(date);
    if (dateDate !== null) {
      const startDate = new Date(dateDate.getFullYear(), dateDate.getMonth(), dateDate.getDate());
      const endDate = new Date(dateDate.getFullYear(), dateDate.getMonth(), dateDate.getDate() + 1);
      queryBuilder.andWhere('trip.startDate >= :startDate AND trip.startDate < :endDate', { startDate, endDate });
    }

    const visits = await queryBuilder.getMany();
    return visits;
  }

  async updateVisitAndAddPhotos(
    id: number,
    updateVisitDto: UpdateVisitDto,
    files: Express.Multer.File[],
  ): Promise<Visit> {
    const visit = await this.visitRepository.findOneBy({ id });
    if(visit.isVisited){
      throw new ConflictException({
        message: "Visit is already visited",
        code: ErrorCode.VISIT_ALREADY_VISITED
      })
    }
    return this.visitRepository.manager.transaction(async (manager: EntityManager) => {
      const visit = await manager.findOneOrFail(Visit, { where: { id } });
      manager.merge(Visit, visit, updateVisitDto);
      if (files.length > 0) {
      const archivePath = await this.photoService.archiveAndUploadPhotos(id, files, manager);
      console.log(`Photos archived and uploaded to: ${archivePath}`);
      }
      return manager.save(visit);
    });
  }

  async remove(id: number, userId: number) {
    const visit = await this.visitRepository.findOne({ where: { id } });
    if (!visit) {
      this.logger.error(`Visit with id ${id} not found`);
      throw new NotFoundException({
        message: 'No visit found',
        code: ErrorCode.VISIT_NOT_FOUND,
      });
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException({
        message: 'No user found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    if (!user.isManager && visit.isPriority) {
      this.logger.error(`User don't have permission to delete visit`);
      throw new ForbiddenException({
        message: 'User dont have permission',
        code: ErrorCode.USER_PERMISSION_DENIED,
      });
    }

    if (visit.isVisited) {
      this.logger.error(`Visit is completed`);
      throw new InternalServerErrorException({
        message: 'Visit is completed',
        code: ErrorCode.USER_PERMISSION_DENIED,
      });
    }

    const result = await this.visitRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException({
        message: `No visit found'`,
        code: ErrorCode.VISIT_NOT_FOUND,
      });
    }
  }
}
