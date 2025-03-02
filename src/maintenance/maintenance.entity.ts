import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Contract } from 'src/contract/contract.entity';

@Entity()
export class MaintenanceRequest extends BaseEntity {


  @ManyToOne(() => Contract, { eager: true }) // Establish foreign key relationship with Contract
  contract: Contract;

  @Column()
  description: string;

  @Column()
  request_status: string;

  @Column()
  special_note: string;
  
} 