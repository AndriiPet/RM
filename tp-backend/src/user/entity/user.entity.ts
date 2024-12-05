import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserWorkRegion } from '../../userWorkRegion/entity/userWorkRegion.entity';
import { Role } from '../../role/entity/role.entity';
import { Trip } from '../../trip/entity/trip.entity';
import { TradingPoint } from '../../tradintPoint/entity/tradingPoint.entity';
import { PasswordReset } from '../../passwordReset/entity/paswordReset.entity';
import { Coordinate } from '../../coordinates/entity/coordinats.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  ipn: string;

  @Column({ nullable: true, type: 'varchar' })
  displayName: string | null;

  @Column({ nullable: true, type: 'varchar' })
  email: string | null;

  @Column({ nullable: true, type: 'varchar' })
  phoneNumber: string | null;

  @Column({ nullable: true, type: 'boolean' })
  isManager: boolean | null;

  @Column({ default: false, type: 'boolean' })
  isRegistered: boolean;

  @Column({ nullable: true, type: 'varchar' })
  password: string | null;

  @Column({ nullable: true, type: 'varchar' })
  lastLatitude: string | null;

  @Column({ nullable: true, type: 'varchar' })
  lastLongitude: string | null;

  @Column({ nullable: true, type: 'varchar' })
  profilePhoto: string | null;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  role: number;

  @OneToMany(() => UserWorkRegion, (userWorkRegion) => userWorkRegion.user, { cascade: true, onDelete: 'CASCADE' })
  userWorkRegions: UserWorkRegion[];

  @OneToMany(() => User, (user) => user.manager)
  subordinates: User[];

  @OneToMany(() => Coordinate, (coordinate) => coordinate.user)
  coordinates: Coordinate[];

  @ManyToOne(() => User, (user) => user.subordinates)
  manager: number | null;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @OneToMany(() => TradingPoint, (tradingPoint) => tradingPoint.user)
  tradingPoints: TradingPoint[];

  @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
  passwordResetTokens: PasswordReset[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
