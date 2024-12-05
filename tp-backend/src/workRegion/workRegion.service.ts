import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkRegionDto } from './dto/create-workRegion.dto';
import { UpdateWorkRegionDto } from './dto/update-workRegion.dto';
import { WorkRegion } from './entity/workRegion.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorCode } from 'src/utils/error';

@Injectable()
export class WorkRegionService {
  constructor(
    @InjectRepository(WorkRegion)
    private readonly workRegionRepository: Repository<WorkRegion>,
  ) {}

  async create(createWorkRegionDto: CreateWorkRegionDto) {
    const existworkRegion = await this.workRegionRepository.findOneBy({
      name: createWorkRegionDto.name,
    });
    if (existworkRegion) {
      throw new ConflictException('Region with the same name is already exist');
    }

    const workRegion = this.workRegionRepository.create(createWorkRegionDto);
    try {
      return await this.workRegionRepository.save(workRegion);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Name already exists');
      } else {
        throw new InternalServerErrorException('Error saving work region: ' + error.message);
      }
    }
  }

  async findAll() {
    const regions = await this.workRegionRepository.find();
    if (!regions) {
      throw new NotFoundException({
        message: 'Regions not found',
        code: ErrorCode.WORK_REGION_NOT_FOUND,
      });
    }
    return regions;
  }

  async findAllWithUser() {
    const regions = await this.workRegionRepository
      .createQueryBuilder('workRegion')
      .leftJoinAndSelect('workRegion.userWorkRegions', 'userWorkRegions')
      .leftJoinAndSelect('userWorkRegions.user', 'user')
      .getMany();

    if (!regions || regions.length === 0) {
      throw new NotFoundException({
        message: 'Regions not found',
        code: ErrorCode.WORK_REGION_NOT_FOUND,
      });
    }

    return regions.map((region) => ({
      id: region.id,
      name: region.name,
      latitude: region.latitude,
      longitude: region.longitude,
      created_at: region.created_at,
      updated_at: region.updated_at,
      users: region.userWorkRegions.map((uwr) => ({
        id: uwr.user.id,
        ipn: uwr.user.ipn,
        displayName: uwr.user.displayName,
        email: uwr.user.email,
        phoneNumber: uwr.user.phoneNumber,
        isManager: uwr.user.isManager,
        isRegistered: uwr.user.isRegistered,
        lastLatitude: uwr.user.lastLatitude,
        lastLongitude: uwr.user.lastLongitude,
        profilePhoto: uwr.user.profilePhoto,
        created_at: uwr.user.created_at,
        updated_at: uwr.user.updated_at,
      })),
    }));
  }

  async findById(id: number) {
    const region = await this.workRegionRepository
      .createQueryBuilder('workRegion')
      .where('workRegion.id = :workRegionId', { workRegionId: id })
      .leftJoinAndSelect('workRegion.userWorkRegions', 'userWorkRegions')
      .leftJoinAndSelect('userWorkRegions.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .getOne();

    if (!region) {
      throw new NotFoundException({
        message: 'Regions not found',
        code: ErrorCode.WORK_REGION_NOT_FOUND,
      });
    }

    return {
      id: region.id,
      name: region.name,
      latitude: region.latitude,
      longitude: region.longitude,
      created_at: region.created_at,
      updated_at: region.updated_at,
      users: region.userWorkRegions.map((uwr) => ({
        id: uwr.user.id,
        ipn: uwr.user.ipn,
        displayName: uwr.user.displayName,
        email: uwr.user.email,
        phoneNumber: uwr.user.phoneNumber,
        isManager: uwr.user.isManager,
        isRegistered: uwr.user.isRegistered,
        lastLatitude: uwr.user.lastLatitude,
        lastLongitude: uwr.user.lastLongitude,
        profilePhoto: uwr.user.profilePhoto,
        created_at: uwr.user.created_at,
        updated_at: uwr.user.updated_at,
        role: uwr.user.role,
      })),
    };
  }

  async update(id: number, updateWorkRegionDto: UpdateWorkRegionDto) {
    const dtoInstance = plainToClass(UpdateWorkRegionDto, updateWorkRegionDto);
    const error = await validate(dtoInstance);

    if (error.length > 0) {
      throw new BadRequestException(error.toString);
    }

    try {
      await this.workRegionRepository.update({ id }, updateWorkRegionDto);
      return await this.workRegionRepository.findOne({ where: { id } });
    } catch (error) {
      console.error('Error updatin region', error);
      throw new InternalServerErrorException('An error occurated with updating the region');
    }
  }

  async remove(id: number) {
    const result = await this.workRegionRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Region is not found');
    }
  }
}
