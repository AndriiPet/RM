import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Coordinate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  date: Date | null;

  @Column({ nullable: true, type: 'varchar' })
  longitude: string | null;

  @Column({ nullable: true, type: 'varchar' })
  latitude: string | null;

  @ManyToOne(() => User, (user) => user.coordinates, { onDelete: 'CASCADE' })
  user: number;

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
