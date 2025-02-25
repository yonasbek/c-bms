import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SubContract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

  @Column()
  duration: number;

  @Column()
  total_amount: number;

  @Column()
  number_of_employees: number;

  @Column()
  attachment_url: string;
} 