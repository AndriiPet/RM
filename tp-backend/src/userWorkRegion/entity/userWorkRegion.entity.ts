import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { WorkRegion } from '../../workRegion/entity/workRegion.entity';

@Entity()
export class UserWorkRegion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userWorkRegions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => WorkRegion, (workRegion) => workRegion.userWorkRegions)
  @JoinColumn({ name: 'workRegion_id' })
  workRegion: WorkRegion;
}
