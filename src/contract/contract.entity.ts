import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn  } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { User } from 'src/users/users.entity';
import { Room } from 'src/room/room.entity';
import { Payment } from 'src/payment/payment.entity';

@Entity('contract')
export class Contract extends BaseEntity {

  @Column()
  roomId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Room, { eager: true }) // Establish foreign key relationship with Room
  @JoinColumn({ name: 'roomId' }) // Explicitly define the foreign key column
  room: Room; // Reference to the Room

  @ManyToOne(() => User, { eager: true }) // Establish foreign key relationship with User
  @JoinColumn({ name: 'userId' }) // Explicitly define the foreign key column
  user: User; // Reference to the User

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  monthly_rent: number;

  @Column({ nullable: true })
  file_url: string;

  @Column()
  contract_status: string;

  @OneToMany(() => Payment, (payment) => payment.contract, { eager: true })
  payments: Payment[];

} 