import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordReset } from './entity/paswordReset.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { ErrorCode } from '../utils/error';

import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  private transporter;

  constructor(
    @InjectRepository(PasswordReset)
    private passwordResetTokenRepository: Repository<PasswordReset>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT, 10),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Торгові представники" <ectorg@eurocommerce.biz>',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
  }

  async create(userEmail: string): Promise<PasswordReset> {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      throw new NotFoundException(`User with email "${userEmail}" not found.`);
    }

    const resetToken = new PasswordReset();
    resetToken.token = crypto.randomBytes(20).toString('hex');
    resetToken.expiresAt = new Date(Date.now() + 60000 * 10);
    resetToken.user = user;

    const resetLink = `http://${process.env.FRONTEND_URL}/resetpassword/${resetToken.token}`;

    await this.sendMail(
      resetToken.user.email,
      'Скидання пароля',
      'Ви отримали цей лист, тому що ви запросили скидання пароля для вашого акаунту.',
      `<p>Ви отримали цей лист, тому що ви (або хтось інший) запросили скидання пароля для вашого акаунту.</p>
          <p>Будь ласка, перейдіть за посиланням, щоб скинути ваш пароль:</p>
          <a href="${resetLink}">Скинути пароль</a>
          `,
    );

    return this.passwordResetTokenRepository.save(resetToken);
  }

  async changePassword(token: string, newPassword: string): Promise<void> {
    const passwordResetEntry = await this.passwordResetTokenRepository.findOne({
      where: {
        token: token,
        used: false,
        expiresAt: MoreThan(new Date()),
      },
      relations: ['user'],
    });

    if (!passwordResetEntry) {
      throw new Error('Токен недійсний або вже використаний.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(passwordResetEntry.user.id, {
      password: hashedPassword,
    });

    await this.passwordResetTokenRepository.update(passwordResetEntry.id, {
      used: true,
    });
  }
}
