import { User } from '../../user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('passwordResetToken')
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ default: false })
  used: boolean;

  @ManyToOne(() => User, (user) => user.passwordResetTokens)
  @JoinColumn({ name: 'userId' })
  user: User;
}
