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
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entity/customer.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorCode } from 'src/utils/error';

@Injectable()
export class CustomerService {
  logger: Logger;

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customerRepository.save(createCustomerDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({
          message: `Customer with th same name already exist'`,
          code: ErrorCode.CUSTOMER_ALREADY_EXIST,
        });
      } else {
        throw new InternalServerErrorException({
          message: 'Saving error',
          code: ErrorCode.SAVING_ERROR,
        });
      }
    }
  }

  async findAll() {
    return this.customerRepository.find();
  }

  async findAllWithPagination(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [customers, total] = await this.customerRepository
      .createQueryBuilder('customer')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return customers;
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException({
        message: 'Customer not found',
        code: ErrorCode.CUSTOMER_NOT_FOUND,
      });
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const dtoInstance = plainToClass(UpdateCustomerDto, updateCustomerDto);

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException({
        message: 'Customer not found',
        code: ErrorCode.CUSTOMER_NOT_FOUND,
      });
    }

    try {
      await this.customerRepository.update({ id }, updateCustomerDto);
      return await this.customerRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        message: 'Customer update failed',
        code: ErrorCode.CUSTOMER_UPDATE_FAILED,
      });
    }
  }

  async remove(id: number) {
    const result = await this.customerRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new NotFoundException({
        message: 'Customer not found',
        code: ErrorCode.CUSTOMER_NOT_FOUND,
      });
    }
  }
}
