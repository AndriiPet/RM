import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code, DataSource, In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ErrorCode } from '../utils/error';
import * as fs from 'fs';
import * as path from 'path';
import * as ftp from 'basic-ftp';
import e, { Response } from 'express';
import { UpdateUserRegistrationDto } from './dto/update-user-registration';
import { WorkRegion } from '../workRegion/entity/workRegion.entity';
import { UserWorkRegion } from '../userWorkRegion/entity/userWorkRegion.entity';

@Injectable()
export class UserService {
  logger: Logger;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(WorkRegion)
    private workRegionRepository: Repository<WorkRegion>,
    @InjectRepository(UserWorkRegion)
    private readonly userWorkRegionsRepository: Repository<UserWorkRegion>,
    private dataSource: DataSource,
  ) {
    this.logger = new Logger();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException({
          message: 'Ipn is already exist',
          code: ErrorCode.USER_CREATE_FAILED_IPN,
        });
      } else {
        throw new InternalServerErrorException({
          message: 'Error saving',
          code: ErrorCode.USER_CREATE_FAILED,
        });
      }
    }
  }

  async findAll() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.manager', 'manager')
      .leftJoinAndSelect('user.userWorkRegions', 'userWorkRegion')
      .leftJoinAndSelect('userWorkRegion.workRegion', 'workRegion')
      .getMany();

    const transformedUsers = users.map((user) => {
      const { userWorkRegions, ...rest } = user;
      const workRegions = userWorkRegions.map((uwr) => uwr.workRegion);
      return { ...rest, workRegions: workRegions };
    });

    return transformedUsers;
  }

  async findAllWithPagination(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.manager', 'manager')
      .leftJoinAndSelect('user.userWorkRegions', 'userWorkRegion')
      .leftJoinAndSelect('userWorkRegion.workRegion', 'workRegion')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const transformedUsers = users.map((user) => {
      const { userWorkRegions, ...rest } = user;
      const workRegions = userWorkRegions.map((uwr) => uwr.workRegion);
      return { ...rest, workRegions: workRegions };
    });

    return transformedUsers;
  }

  async findOne(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.manager', 'manager')
      .leftJoinAndSelect('user.userWorkRegions', 'userWorkRegion')
      .leftJoinAndSelect('userWorkRegion.workRegion', 'workRegion')
      .getOne();

    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    return {
      id: user.id,
      ipn: user.ipn,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isManager: user.isManager,
      isRegistered: user.isRegistered,
      password: user.password,
      profilePhoto: user.profilePhoto,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: user.role,
      manager: user.manager,
      workRegions: user.userWorkRegions.map((uwr) => ({
        id: uwr.workRegion.id,
        name: uwr.workRegion.name,
        latitude: uwr.workRegion.latitude,
        longitude: uwr.workRegion.longitude,
        created_at: uwr.workRegion.created_at,
        updated_at: uwr.workRegion.updated_at,
      })),
    };
  }

  async findByName(displayName: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.displayName = :displayName', { displayName })
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.manager', 'manager')
      .leftJoinAndSelect('user.userWorkRegions', 'userWorkRegion')
      .leftJoinAndSelect('userWorkRegion.workRegion', 'workRegion')
      .getOne();

    if (!user) {
      this.logger.error(`User with name ${displayName} not found`);
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    return {
      id: user.id,
      ipn: user.ipn,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isManager: user.isManager,
      isRegistered: user.isRegistered,
      password: user.password,
      profilePhoto: user.profilePhoto,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: user.role,
      manager: user.manager,
      workRegions: user.userWorkRegions.map((uwr) => ({
        id: uwr.workRegion.id,
        name: uwr.workRegion.name,
        latitude: uwr.workRegion.latitude,
        longitude: uwr.workRegion.longitude,
        created_at: uwr.workRegion.created_at,
        updated_at: uwr.workRegion.updated_at,
      })),
    };
  }

  async findAllManagers() {
    const result = await this.userRepository.findAndCount({
      where: { isManager: true },
    });

    return result;
  }

  async getAllVisitsForUser(userId: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.trips', 'trip')
      .leftJoinAndSelect('trip.visits', 'visit')
      .getOne();

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }
    let completedVisits = 0;
    let uncompletedVisits = 0;

    for (const trip of user.trips) {
      for (const visit of trip.visits) {
        if (visit.isVisited) {
          completedVisits++;
        } else {
          uncompletedVisits++;
        }
      }
    }

    return {
      completed: completedVisits,
      uncompleted: uncompletedVisits,
    };
  }

  async getVisitedVisitsPerMonth(userId: number, startDate: Date, endDate: Date) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    const subordinates = await this.findAllSubordinates(user);

    if (!subordinates || subordinates.length === 0) {
      throw new NotFoundException({
        message: 'No subordinates found',
        code: ErrorCode.SUBORDINATES_NOT_FOUND,
      });
    }

    endDate.setMonth(endDate.getMonth());

    const allVisits = [];
    const lastDayOfMonth = new Date(endDate + '-01');
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(0);
    for (const subordinate of subordinates) {
      const subUser = await this.userRepository.findOne({
        where: { id: subordinate.id },
        relations: ['trips', 'trips.visits'],
      });

      if (subUser && subUser.trips) {
        const subVisits = subUser.trips.flatMap((trip) =>
          trip.visits.filter((visit) => visit.visitDate >= startDate && visit.visitDate < lastDayOfMonth),
        );
        allVisits.push(...subVisits);
      }
    }
    const visitedVisitsPerMonth = {};

    const uniqueMonths = Array.from(new Set(allVisits.map((visit) => visit.visitDate.toISOString().slice(0, 7))));

    uniqueMonths.forEach((month) => {
      visitedVisitsPerMonth[month] = 0;
    });

    allVisits.forEach((visit) => {
      const month = visit.visitDate.toISOString().slice(0, 7);
      if (visitedVisitsPerMonth.hasOwnProperty(month)) {
        visitedVisitsPerMonth[month]++;
      }
    });

    const currentMonth = new Date(startDate);
    const endMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1);

    while (currentMonth <= endMonth) {
      const monthKey = currentMonth.toISOString().slice(0, 7);
      if (!visitedVisitsPerMonth.hasOwnProperty(monthKey)) {
        visitedVisitsPerMonth[monthKey] = 0;
      }
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    const sortedVisitsPerMonth = Object.fromEntries(Object.entries(visitedVisitsPerMonth).sort());

    return sortedVisitsPerMonth;
  }

  async getVisitedVisitsStats(userId: number, currentDate: Date) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    const subordinates = await this.findAllSubordinates(user);

    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    let completedCurrentMonth = 0;
    let uncompletedCurrentMonth = 0;
    let completedPreviousMonth = 0;
    let uncompletedPreviousMonth = 0;

    for (const subordinate of subordinates) {
      const userWithTrips = await this.userRepository.findOne({
        where: { id: subordinate.id },
        relations: ['trips', 'trips.visits'],
      });

      if (!userWithTrips) {
        continue;
      }

      completedCurrentMonth += userWithTrips.trips.flatMap((trip) =>
        trip.visits.filter(
          (visit) => visit.visitDate >= currentMonth && visit.visitDate < nextMonth && visit.isVisited,
        ),
      ).length;

      uncompletedCurrentMonth += userWithTrips.trips.flatMap((trip) =>
        trip.visits.filter(
          (visit) => visit.visitDate >= currentMonth && visit.visitDate < nextMonth && !visit.isVisited,
        ),
      ).length;

      completedPreviousMonth += userWithTrips.trips.flatMap((trip) =>
        trip.visits.filter(
          (visit) => visit.visitDate >= previousMonth && visit.visitDate < currentMonth && visit.isVisited,
        ),
      ).length;

      uncompletedPreviousMonth += userWithTrips.trips.flatMap((trip) =>
        trip.visits.filter(
          (visit) => visit.visitDate >= previousMonth && visit.visitDate < currentMonth && !visit.isVisited,
        ),
      ).length;
    }

    return {
      completedCurrentMonth,
      uncompletedCurrentMonth,
      completedPreviousMonth,
      uncompletedPreviousMonth,
    };
  }

  async getVisitsForUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['trips', 'trips.visits'],
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    const visits = [];
    user.trips.forEach((trip) => {
      visits.push(...trip.visits);
    });

    return visits;
  }

  async findProfilePhoto(id: number, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user || !user.profilePhoto) {
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    const localPath = path.resolve('./downloads', path.basename(user.profilePhoto));
    await this.downloadFileFromFTP(user.profilePhoto, localPath);

    if (fs.existsSync(localPath)) {
      res.sendFile(localPath, (err) => {
        if (err) {
          console.error(`Error sending file: ${err}`);
          res.status(500).send('Error sending file');
        } else {
          fs.unlink(localPath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${err}`);
            }
          });
        }
      });
    } else {
      throw new NotFoundException({
        message: 'User photo not found',
        code: ErrorCode.USER_PHOTO_NOT_FOUND,
      });
    }
  }

  async subordinatesInRegion(regionId: number, managerId: number) {
    const regions = await this.getSubordinatesByRegion(managerId);

    const region = regions.find((region) => region.id === regionId);
    if (region) {
      const usersWithRoles = await Promise.all(
        region.users.map(async (user) => {
          const role = await this.getUserRole(user.id);
          return {
            ...user,
            role,
          };
        }),
      );

      return {
        id: region.id,
        name: region.name,
        longitude: region.longitude,
        latitude: region.latitude,
        users: usersWithRoles,
      };
    }
    throw new NotFoundException({
      message: 'Region not found',
      code: ErrorCode.WORK_REGION_NOT_FOUND,
    });
  }

  private async getUserRole(id) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['role'],
    });

    return user.role;
  }

  async getSubordinatesByRegion(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userWorkRegions', 'userWorkRegions.workRegion'],
    });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    const userWorkRegions = user.userWorkRegions.map((uwr) => uwr.workRegion);
    const subordinates = await this.getAllSubordinates(user.id);
    const groupedSubordinates = await this.groupByWorkRegion(userWorkRegions, subordinates);
    const restructuredData = groupedSubordinates.map((group) => ({
      ...group.workRegion,
      users: group.users,
    }));

    return restructuredData;
  }

  async restructureDataUserCentric(userId: number): Promise<any[]> {
    const restructuredData = [];
    var data = await this.getSubordinatesByRegion(userId);
    for (const region of data) {
      for (const user of region.users) {
        const existingUser = restructuredData.find((item) => item.id === user.id);

        if (existingUser) {
          existingUser.workRegions.push({
            id: region.id,
            name: region.name,
            longitude: region.longitude,
            latitude: region.latitude,
          });
        } else {
          restructuredData.push({
            ...user,
            workRegions: [
              {
                id: region.id,
                name: region.name,
                longitude: region.longitude,
                latitude: region.latitude,
              },
            ],
          });
        }
      }
    }

    return restructuredData;
  }

  async getAllSubordinates(managerId: number): Promise<User[]> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    const directSubordinates = await this.userRepository
      .createQueryBuilder('user')
      .where('user.manager = :managerId', { managerId: manager.id })
      .getMany();

    const allSubordinates = [];
    for (const subordinate of directSubordinates) {
      allSubordinates.push(subordinate);
      if (subordinate.isManager) {
        const subSubordinates = await this.getAllSubordinates(subordinate.id);
        allSubordinates.push(...subSubordinates);
      }
    }

    return allSubordinates;
  }

  async findAllSubordinates(manager: User): Promise<User[]> {
    if (!manager.isManager) {
      return [];
    }

    const directSubordinates = await this.userRepository
      .createQueryBuilder('user')
      .where('user.manager = :managerId', { managerId: manager.id })
      .getMany();

    const allSubordinates = [];
    for (const subordinate of directSubordinates) {
      allSubordinates.push(subordinate);
      if (subordinate.isManager) {
        const subSubordinates = await this.findAllSubordinates(subordinate);
        allSubordinates.push(...subSubordinates);
      }
    }

    return allSubordinates;
  }

  private async groupByWorkRegion(userWorkRegions: WorkRegion[], subordinates: User[]): Promise<any> {
    const subordinateIds = subordinates.map((user) => user.id);
    var userWorkRegionsWithSubordinates = [];
    if (subordinateIds.length !== 0) {
      userWorkRegionsWithSubordinates = await this.userWorkRegionsRepository
        .createQueryBuilder('userWorkRegion')
        .leftJoinAndSelect('userWorkRegion.workRegion', 'workRegion')
        .leftJoinAndSelect('userWorkRegion.user', 'user')
        .where('user.id IN (:...subordinateIds)', { subordinateIds })
        .getMany();
    }
    const grouped = userWorkRegions.reduce((acc, workRegion) => {
      acc[workRegion.id] = {
        workRegion: {
          id: workRegion.id,
          name: workRegion.name,
          longitude: workRegion.longitude,
          latitude: workRegion.latitude,
        },
        users: [],
      };
      return acc;
    }, {});

    if (userWorkRegionsWithSubordinates.length !== 0) {
      userWorkRegionsWithSubordinates.forEach((userWorkRegion) => {
        const { workRegion, user } = userWorkRegion;
        if (grouped[workRegion.id]) {
          grouped[workRegion.id].users.push(user);
        }
      });
    }

    return Object.values(grouped);
  }

  async getVisitByManagerAndByRegion(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    const subordinates = await this.findAllSubordinates(user);
    let totalCompletedVisits = 0;
    let totalUncompletedVisits = 0;

    for (const user of subordinates) {
      const userVisits = await this.getAllVisitsForUser(user.id);
      totalCompletedVisits += userVisits.completed;
      totalUncompletedVisits += userVisits.uncompleted;
    }

    return {
      completed: totalCompletedVisits,
      uncompleted: totalUncompletedVisits,
    };
  }

  async getUserLocation(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException({
        message: `User with id ${id} not found`,
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    return user;
  }

  private async findAllSubordinatesWithoutRegion(manager: User): Promise<User[]> {
    if (!manager.isManager) {
      return [];
    }

    const directSubordinates = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userWorkRegions', 'userWorkRegions')
      .leftJoinAndSelect('userWorkRegions.workRegion', 'workRegion')
      .where('user.manager = :managerId', { managerId: manager.id })
      .getMany();

    const allSubordinates = [];
    for (const subordinate of directSubordinates) {
      allSubordinates.push(subordinate);
      if (subordinate.isManager) {
        const subSubordinates = await this.findAllSubordinates(subordinate);
        allSubordinates.push(...subSubordinates);
      }
    }

    return allSubordinates;
  }

  async getUsersWithoutRegion() {
    const users = await this.userRepository.find({
      relations: ['userWorkRegions'],
    });

    const usersWithoutRegion = users.filter(
      (user) => user.userWorkRegions.length === 0 && (user.isManager === false || user.isManager === null),
    );
    const transformUser = (user: User) => {
      const { userWorkRegions, ...rest } = user;
      const workRegions = userWorkRegions ? userWorkRegions.map((uwr) => uwr.workRegion) : [];
      return { ...rest, workRegions };
    };

    if (usersWithoutRegion.map(transformUser).length === 0) {
      throw new NotFoundException({
        message: `User without region not found`,
        code: ErrorCode.USER_WITHOUT_REGION_NOT_FOUND,
      });
    }

    return usersWithoutRegion.map(transformUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException({
        message: 'No update data provied',
        code: ErrorCode.USER_UPDATE_FAILED,
      });
    }
    const { workRegionIds, ...updateDetails } = updateUserDto;
    if (updateDetails.password) {
      const salt = await bcrypt.genSalt();
      updateDetails.password = await bcrypt.hash(updateDetails.password, salt);
    }

    const roleName = 'Менеджер';

    if (updateDetails.displayName === roleName) {
      updateDetails.isManager = true;
    }

    const user = this.userRepository.findOneBy({ id });

    const userRole = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id })
      .andWhere('role.name = :roleName', { roleName })
      .getOne();

    if (userRole) {
      updateDetails.isManager = true;
    }

    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException({
        message: `User with id ${id} not found`,
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    try {
      await this.userRepository.update(
        { id },
        {
          ...updateDetails,
        },
      );
      if (workRegionIds) {
        await this.userWorkRegionsRepository.delete({ user: { id } });

        const userWorkRegions = workRegionIds.map((workRegionId) => {
          return this.userWorkRegionsRepository.create({
            user: { id: id } as User,
            workRegion: { id: workRegionId } as WorkRegion,
          });
        });
        await this.userWorkRegionsRepository.save(userWorkRegions);
      }
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('user.manager', 'manager')
        .getOne();
    } catch (error) {
      console.error('Error updating user: ', error);
      throw new InternalServerErrorException({
        message: 'Error saving role: ' + error.message,
        code: ErrorCode.USER_UPDATE_FAILED,
      });
    }
  }

  async updateByIpn(ipn: string, updateUserDto: UpdateUserRegistrationDto): Promise<User> {
    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException({
        message: 'No update data provied',
        code: ErrorCode.USER_UPDATE_FAILED,
      });
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    const userEmail = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });

    if (userEmail) {
      throw new ConflictException({
        message: 'User with this email already exist',
        code: ErrorCode.USER_EMAIL_ALREADY_EXIST,
      });
    }
    const user = await this.userRepository.findOneBy({ ipn });
    if (!user) {
      this.logger.error(`User with id ${ipn} not found`);
      throw new NotFoundException({
        message: `User with sssid ${ipn} not found`,
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    if (user.isRegistered) {
      throw new ConflictException({
        message: 'User is already registered',
        code: ErrorCode.USER_ALREADY_REGISTERED,
      });
    }

    try {
      await this.userRepository.update({ ipn }, { ...updateUserDto, isRegistered: true });
      return await this.userRepository.findOne({ where: { ipn } });
    } catch (error) {
      console.error('Error updating user: ', error);
      throw new InternalServerErrorException({
        message: 'Error saving role: ' + error.message,
        code: ErrorCode.USER_UPDATE_FAILED,
      });
    }
  }

  private async uploadFileToFTP(localPath: string, remotePath: string): Promise<void> {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
      await client.access({
        host: 'storage.dcxv.com',
        user: 's569',
        password: 'o5Yq26X1RhHdp7OiU227',
        secure: false,
      });

      await client.uploadFrom(localPath, remotePath);
    } catch (error) {
      console.error('FTP upload error:', error);
    } finally {
      client.close();
    }
  }

  private async downloadFileFromFTP(remotePath: string, localPath: string): Promise<void> {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
      await client.access({
        host: 'storage.dcxv.com',
        user: 's569',
        password: 'o5Yq26X1RhHdp7OiU227',
        secure: false,
      });

      console.log(`Downloading from FTP: ${remotePath} to ${localPath}`);
      await client.downloadTo(localPath, remotePath);

      if (!fs.existsSync(localPath)) {
        console.error(`File not found after download: ${localPath}`);
        throw new NotFoundException({
          message: 'Profile photo not found in FTP',
          code: ErrorCode.USER_PHOTO_NOT_FOUND,
        });
      }
    } catch (error) {
      console.error('FTP download error:', error);
      throw new NotFoundException({
        message: 'Profile photo not found in FTP',
        code: ErrorCode.USER_PHOTO_NOT_FOUND,
      });
    } finally {
      client.close();
    }
  }

  async updateUserProfilePhoto(id: number, file: Express.Multer.File) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException({
        message: `User with id ${id} not found`,
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    const remotePath = `/.next/files/photoTorg/${file.filename}`;
    await this.uploadFileToFTP(file.path, remotePath);

    user.profilePhoto = remotePath;
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await manager.update(User, { manager: id }, { manager: null });

      await manager.delete(UserWorkRegion, { user: { id } });

      const result = await manager.delete(User, id);

      if (result.affected === 0) {
        throw new NotFoundException({
          message: `User with ID ${id} not found`,
          code: ErrorCode.USER_NOT_FOUND,
        });
      }
    });
  }
}
