import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

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

  @Column()
  file_url: string;

  @Column()
  service_type: string;

  @Column()
  building_ids: string;
} 