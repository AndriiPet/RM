import { TradingPoint } from '../../tradintPoint/entity/tradingPoint.entity';
import { Trip } from '../../trip/entity/trip.entity';
import { User } from '../../user/entity/user.entity';
import { UserWorkRegion } from '../../userWorkRegion/entity/userWorkRegion.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class WorkRegion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  latitude: string | null;

  @Column({ nullable: true, type: 'varchar' })
  longitude: string | null;

  @OneToMany(() => UserWorkRegion, (userWorkRegion) => userWorkRegion.workRegion)
  userWorkRegions: UserWorkRegion[];

  @OneToMany(() => Trip, (trip) => trip.workRegion)
  trips: Trip[];

  @OneToMany(() => TradingPoint, (tradingPoint) => tradingPoint.workRegion)
  tradingPoint: TradingPoint[];

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
