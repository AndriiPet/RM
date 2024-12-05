import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { TradingPoint } from '../../tradintPoint/entity/tradingPoint.entity';
import { Trip } from '../../trip/entity/trip.entity';
import { Photo } from '../../photo/entity/photo.entity';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false, type: 'boolean' })
  isVisited: boolean;

  @Column({ default: false, type: 'boolean' })
  isPriority: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  timeStart: Date;

  @Column({ nullable: true, type: 'timestamp' })
  timeEnd: Date;

  @Column({ nullable: true, type: 'timestamp' })
  visitDate: Date;

  @Column({ nullable: true, type: 'varchar' })
  latitude: string | null;

  @Column({ nullable: true, type: 'varchar' })
  longitude: string | null;

  @Column({ nullable: true, type: 'varchar' })
  comment: string | null;

  @ManyToOne(() => TradingPoint, (tradingPoint) => tradingPoint.visits, { onDelete: 'CASCADE' })
  tradingPoint: number;

  @ManyToOne(() => Trip, (trip) => trip.visits, { onDelete: 'CASCADE' })
  trip: number;

  @OneToMany(() => Photo, (photo) => photo.visit)
  photos: Photo[];

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
