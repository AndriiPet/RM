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
import { CreateTradingPointDto } from './dto/create-tradingPoint.dto';
import { UpdateTradingPointDto } from './dto/update-tradingPoint.dto';
import { TradingPoint } from './entity/tradingPoint.entity';
import { Validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorCode } from 'src/utils/error';
import { error } from 'console';
import { User } from '../user/entity/user.entity';

@Injectable()
export class TradingPointService {
  logger: Logger;
  constructor(
    @InjectRepository(TradingPoint)
    private readonly tradingPointRepository: Repository<TradingPoint>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.logger = new Logger();
  }

  async create(createTradingPointDto: CreateTradingPointDto) {
    try {
     await this.tradingPointRepository.save(createTradingPointDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({
          message: 'Trading Point already exist',
          code: ErrorCode.TRADING_POINT_ALREADY_EXIST,
        });
      } else {
        throw new InternalServerErrorException({
          message: 'Saving error',
          code: ErrorCode.SAVING_ERROR,
        });
      }
    }
    const tradingPoint = await this.tradingPointRepository.findOne({
      where: { name: createTradingPointDto.name },
    });
    return tradingPoint.id;
  }

  async findAll(userId: number) {
    const tradingPoints = await this.tradingPointRepository.find({
      relations: ['customer', 'workRegion', 'user'],
    });

    if (!tradingPoints || tradingPoints.length === 0) {
      throw new NotFoundException({
        message: `Trading point not found`,
        code: ErrorCode.TRADING_POINT_NOT_FOUND,
      });
    }

    const updatedTradingPoints = tradingPoints.map((tradingPoint) => {
      let tradingPointUserId = '';

      const userDict: { [key: string]: any } = {};

      Object.entries(tradingPoint.user).forEach(([key, value]) => {
        userDict[key] = value;
        if (key === 'id') {
          tradingPointUserId = value.toString();
        }
      });

      let canDelete = false;

      if (tradingPoint.visits === undefined && tradingPointUserId === userId.toString()) {
        canDelete = true;
      }

      delete tradingPoint.user;
      return { ...tradingPoint, canDelete };
    });

    return updatedTradingPoints;
  }

  async findAllWithPagination(userId: number, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [tradingPoints, total] = await this.tradingPointRepository.findAndCount({
      relations: ['customer', 'workRegion', 'user'],
      skip: skip,
      take: limit,
    });

    if (!tradingPoints || tradingPoints.length === 0) {
      throw new NotFoundException({
        message: `Trading point not found`,
        code: ErrorCode.TRADING_POINT_NOT_FOUND,
      });
    }

    const updatedTradingPoints = tradingPoints.map((tradingPoint) => {
      let tradingPointUserId = '';

      const userDict: { [key: string]: any } = {};

      Object.entries(tradingPoint.user).forEach(([key, value]) => {
        userDict[key] = value;
        if (key === 'id') {
          tradingPointUserId = value.toString();
        }
      });

      let canDelete = false;

      if (tradingPoint.visits === undefined && tradingPointUserId === userId.toString()) {
        canDelete = true;
      }

      delete tradingPoint.user;
      return { ...tradingPoint, canDelete };
    });

    return {
      data: updatedTradingPoints,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number, userId: number) {
    const tradingPoint = await this.tradingPointRepository
      .createQueryBuilder('tradingPoint')
      .where('tradingPoint.id = :id', { id })
      .leftJoinAndSelect('tradingPoint.workRegion', 'workRegion')
      .leftJoinAndSelect('tradingPoint.customer', 'customer')
      .leftJoinAndSelect('tradingPoint.user', 'user')
      .getOne();

    if (!tradingPoint) {
      this.logger.error(`Trading point with id ${id} not found`);
      throw new NotFoundException({
        message: `Trading point not found`,
        code: ErrorCode.TRADING_POINT_NOT_FOUND,
      });
    }

    let tradingPointUserId = '';

    const userDict: { [key: string]: any } = {};

    Object.entries(tradingPoint.user).forEach(([key, value]) => {
      userDict[key] = value;
      if (key === 'id') {
        tradingPointUserId = value.toString();
      }
    });

    let canDelete = false;

    if (tradingPoint.visits === undefined && tradingPointUserId === userId.toString()) {
      canDelete = true;
    }

    delete tradingPoint.user;

    return { ...tradingPoint, canDelete };
  }

  async findOneByName(name: string, userId: number) {
    const tradingPoint = await this.tradingPointRepository.findOne({
      where: { name: name },
      relations: ['customer', 'workRegion', 'user'],
    });
    if (!tradingPoint) {
      this.logger.error(`Trading point with name ${name} not found`);
      throw new NotFoundException({
        message: `Trading point not found`,
        code: ErrorCode.TRADING_POINT_NOT_FOUND,
      });
    }
    let tradingPointUserId = '';

    const userDict: { [key: string]: any } = {};

    Object.entries(tradingPoint.user).forEach(([key, value]) => {
      userDict[key] = value;
      if (key === 'id') {
        tradingPointUserId = value.toString();
      }
    });

    let canDelete = false;

    if (tradingPoint.visits === undefined && tradingPointUserId === userId.toString()) {
      canDelete = true;
    }

    delete tradingPoint.user;

    return { ...tradingPoint, canDelete };
  }

  async findTradingPointByUserId(userId: number) {
    const tradingPoints = await this.tradingPointRepository
      .createQueryBuilder('trading_point')
      .leftJoinAndSelect('trading_point.customer', 'customer')
      .leftJoinAndSelect('trading_point.workRegion', 'workRegion')
      .leftJoinAndSelect('trading_point.user', 'user')
      .where('trading_point.user_id = :userId', { userId })
      .getMany();

    if (!tradingPoints || tradingPoints.length === 0) {
      throw new NotFoundException({
        message: `Trading point not found`,
        code: ErrorCode.TRADING_POINT_NOT_FOUND,
      });
    }

    const updatedTradingPoints = tradingPoints.map((tradingPoint) => {
      let canDelete = false;

      if (tradingPoint.visits === undefined) {
        canDelete = true;
      }

      delete tradingPoint.user;

      return { ...tradingPoint, canDelete };
    });

    return updatedTradingPoints;
  }

  async findTradingPointsByWorkRegion(workRegionId: number, userId: number) {
    const tradingPoints = await this.tradingPointRepository
      .createQueryBuilder('tradingPoint')
      .leftJoinAndSelect('tradingPoint.customer', 'customer')
      .leftJoinAndSelect('tradingPoint.workRegion', 'workRegion')
      .leftJoinAndSelect('tradingPoint.user', 'user')
      .leftJoinAndSelect('tradingPoint.visits', 'visits')
      .where('tradingPoint.workRegion.id = :workRegionId', { workRegionId })
      .getMany();

    if (!tradingPoints || tradingPoints.length === 0) {
      throw new NotFoundException({
        message: `Trading point not found`,
        code: ErrorCode.TRADING_POINT_NOT_FOUND,
      });
    }

    const updatedTradingPoints = tradingPoints.map((tradingPoint) => {
      let tradingPointUserId = '';

      Object.entries(tradingPoint.user).forEach(([key, value]) => {
        if (key === 'id') {
          tradingPointUserId = value.toString();
        }
      });

      let canDelete = false;
      if (tradingPoint.visits === undefined && tradingPointUserId === userId.toString()) {
        canDelete = true;
      }

      delete tradingPoint.user;

      return { ...tradingPoint, canDelete };
    });

    return updatedTradingPoints;
  }

  async update(id: number, updateTradingPointDto: UpdateTradingPointDto): Promise<TradingPoint> {
    if (!Object.keys(updateTradingPointDto).length) {
      throw new BadRequestException({
        message: 'No update data provoded',
        code: ErrorCode.TRADING_POINT_UPDATE_FAILED,
      });
    }

    const tradingPoint = await this.tradingPointRepository.findOneBy({ id });
    if (!tradingPoint) {
      this.logger.error(`Trading point with id ${id} not found`);
      throw new NotFoundException({
        message: `Trading point with id ${id} not found`,
        code: ErrorCode.TRADING_POINT_NOT_FOUND,
      });
    }

    try {
      await this.tradingPointRepository.update({ id }, updateTradingPointDto);
      return await this.tradingPointRepository.findOne({ where: { id } });
    } catch (error) {
      console.error('Error upating trading point: ' + error);
      throw new InternalServerErrorException({
        message: 'Error saving trading point: ' + error.message,
        code: ErrorCode.TRADING_POINT_UPDATE_FAILED,
      });
    }
  }

  async remove(id: number, userId: number) {
    const tradingPoint = await this.tradingPointRepository.findOne({
      where: { id },
      relations: ['visits', 'user'],
    });
    var tradingPointUserId = 0;
    Object.entries(tradingPoint.user).forEach(([key, value]) => {
      if ((key = 'id')) {
        tradingPointUserId = value;
      }
    });

    if (!tradingPoint.visits && tradingPointUserId === userId) {
      const delTradingPoint = await this.tradingPointRepository.delete(id);
      if (delTradingPoint.affected === 0) {
        throw new NotFoundException({
          message: `Trading point with id ${id} not found`,
          code: ErrorCode.TRADING_POINT_NOT_FOUND,
        });
      }
    }
  }
}
