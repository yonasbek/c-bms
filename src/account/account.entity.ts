import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  account_type: string;

  @Column()
  contract_id: string;
} 