import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Contract } from '../contract/contract.entity';

@Entity('contract_documents')
export class ContractDocument extends BaseEntity {
  @Column()
  contractId: number;

  @Column()
  document_name: string;

  @Column()
  document_url: string;

  @Column({ nullable: true })
  document_type: string;

  @Column({ nullable: true })
  document_size: number;

  @ManyToOne(() => Contract, { eager: false })
  @JoinColumn({ name: 'contractId' })
  contract: Contract;
} 