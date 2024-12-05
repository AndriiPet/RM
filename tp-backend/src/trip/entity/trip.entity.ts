import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { Visit } from '../../visit/entity/visit.entity';
import { WorkRegion } from '../../workRegion/entity/workRegion.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  startDate: Date;

  @ManyToOne(() => User, (user) => user.trips, { onDelete: 'CASCADE' })
  user: number;

  @ManyToOne(() => WorkRegion, (workRegion) => workRegion.trips)
  workRegion: number;

  @OneToMany(() => Visit, (visit) => visit.trip)
  visits: Visit[];

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
