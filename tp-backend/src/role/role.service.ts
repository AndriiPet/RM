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
import * as bcrypt from 'bcrypt';
import { ErrorCode } from '../utils/error';
import { throwError } from 'rxjs';
import { error } from 'console';
import { CreateRoleDto } from './dto/create-role.do';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entity/role.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existsRole = await this.roleRepository.findOneBy({
      name: createRoleDto.name,
    });
    if (existsRole) {
      throw new ConflictException({
        message: `Name already exist'`,
        code: ErrorCode.ROLE_ALREADY_EXIST,
      });
    }

    const role = this.roleRepository.create(createRoleDto);
    try {
      return await this.roleRepository.save(role);
    } catch (error) {
      if (error.code === ' 23505') {
        throw new ConflictException({
          message: `Name already exist'`,
          code: ErrorCode.ROLE_ALREADY_EXIST,
        });
      } else {
        throw new InternalServerErrorException({
          message: `Saving error'`,
          code: ErrorCode.SAVING_ERROR,
        });
      }
    }
  }

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException({
        message: `Role not found'`,
        code: ErrorCode.ROLE_NOT_FOUND,
      });
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const dtoInstance = plainToClass(UpdateRoleDto, updateRoleDto);

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: `Error update'`,
        code: ErrorCode.ROLE_UPDATE_FAILED,
      });
    }

    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException({
        message: `Role not found'`,
        code: ErrorCode.ROLE_NOT_FOUND,
      });
    }

    try {
      await this.roleRepository.update({ id }, updateRoleDto);
      return await this.roleRepository.findOne({ where: { id } });
    } catch (error) {
      console.error('Error updating role: ', error);
      throw new InternalServerErrorException({
        message: `Error update'`,
        code: ErrorCode.ROLE_UPDATE_FAILED,
      });
    }
  }

  async remove(id: number) {
    const result = await this.roleRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException({
        message: `Role not found'`,
        code: ErrorCode.ROLE_NOT_FOUND,
      });
    }
  }
}