import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Contract } from 'src/contract/contract.entity';
import { Room } from 'src/room/room.entity';

@Entity()
export class MaintenanceRequest extends BaseEntity {

  @Column()
  roomId: number;

  @ManyToOne(() => Room, { eager: true }) // Establish foreign key relationship with Contract
  @JoinColumn({ name: 'roomId' }) // Explicitly define the foreign key column
  room: Room;

  @Column()
  description: string;

  @Column()
  request_status: string;

  @Column({ nullable: true })
  special_note: string;

  @Column({ nullable: true })
  priority: string;
  
} 