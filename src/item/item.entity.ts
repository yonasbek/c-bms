import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity()
export class Item extends BaseEntity {


  @Column()
  name: string; // Example property for the item

  @Column()
  description: string; // Example property for the item
} 