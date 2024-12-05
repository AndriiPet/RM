import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthSingInDto } from './dto/auth.dto';
import { AuthSignInResponseDto } from './dto/auth-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { ErrorCode } from 'src/utils/error';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(authSingInDto: AuthSingInDto): Promise<AuthSignInResponseDto> {
    const { email, password } = authSingInDto;
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
        code: ErrorCode.USER_PASSWORD_NOT_MATCH,
      });
    }

    const payload = {
      id: user.id,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
