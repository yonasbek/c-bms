import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MaintenanceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contract_id: string;

  @Column()
  description: string;

  @Column()
  request_status: string;
} 