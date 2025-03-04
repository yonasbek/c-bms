import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Contract } from 'src/contract/contract.entity';

@Entity()
export class MaintenanceRequest extends BaseEntity {

  @Column()
  contractId: number;

  @ManyToOne(() => Contract, { eager: true }) // Establish foreign key relationship with Contract
  @JoinColumn({ name: 'contractId' }) // Explicitly define the foreign key column
  contract: Contract;

  @Column()
  description: string;

  @Column()
  request_status: string;

  @Column({ nullable: true })
  special_note: string;

  @Column({ nullable: true })
  priority: string;
  
} 