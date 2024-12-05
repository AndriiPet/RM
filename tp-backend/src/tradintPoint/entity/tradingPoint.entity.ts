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
import { Customer } from '../../customer/entity/customer.entity';
import { WorkRegion } from '../../workRegion/entity/workRegion.entity';

@Entity()
export class TradingPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  address: string | null;

  @Column({ nullable: true, type: 'varchar' })
  longitude: string | null;

  @Column({ nullable: true, type: 'varchar' })
  latitude: string | null;

  @Column({ nullable: true, type: 'varchar' })
  phoneNumber: string | null;

  @ManyToOne(() => User, (user) => user.tradingPoints, { onDelete: 'CASCADE' })
  user: number;

  @ManyToOne(() => Customer, (customer) => customer.tradingPoints)
  customer: number;

  @ManyToOne(() => WorkRegion, (workRegion) => workRegion.tradingPoint)
  workRegion: number;

  @OneToMany(() => Visit, (visit) => visit.tradingPoint)
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
