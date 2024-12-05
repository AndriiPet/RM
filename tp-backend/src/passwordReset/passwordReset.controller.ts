import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { PasswordResetService } from './passwordReset.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Password Reset')
@Controller('passwordReset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('/request')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Body('email') email: string) {
    try {
      await this.passwordResetService.create(email);
      return {
        message: 'If a user with tha email exists, a password reset email has been sent',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/apply')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body('token') token: string, @Body('newPassword') newPassword: string) {
    try {
      await this.passwordResetService.changePassword(token, newPassword);
      return { message: 'Password has been successfully changed' };
    } catch (error) {
      throw new Error('Failed to change the password');
    }
  }
}
