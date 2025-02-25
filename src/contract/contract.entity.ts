import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_id: string;

  @Column()
  tenant_id: string;

  @Column()
  duration: number;

  @Column()
  payment_per_sqm: number;

  @Column()
  payment_item: string;

  @Column()
  file_url: string;

  @Column()
  status: string;
} 