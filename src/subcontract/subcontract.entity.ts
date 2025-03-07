import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Building } from 'src/building/building.entity';

@Entity()
export class SubContract extends BaseEntity {


  @Column()
  company_name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  amount: number;

  @Column()
  number_of_employees: number;

  @Column({nullable: true})
  file_url: string;

  @Column()
  service_type: string;

  @Column()
  buildingId: string;

  @Column()
  contact_name: string

  @Column()
  contact_phone: string

  @Column()
  contact_email: string

  @Column()
  service_days: string

  @Column()
  service_hours: string

  @Column({default: 'active'})
  status: string

  @ManyToOne(() => Building, (building) => building.subContracts)
  @JoinColumn({ name: 'buildingId' })
  building: Building; 
} 