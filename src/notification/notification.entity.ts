import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { NotificationType } from './notification.dto';
import { Building } from '../building/building.entity';
import { User } from '../users/users.entity';

@Entity('notifications')
export class Notification extends BaseEntity {

  @Column()
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.OTHER
  })
  type: NotificationType;


  @Column({ nullable: true })
  userId: number;

  @Column()
  buildingId: number;

  @ManyToOne(() => Building, { eager: true })
  @JoinColumn({ name: 'buildingId' })
  building: Building;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;
} 