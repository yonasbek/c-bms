import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from '../item/item.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, { eager: true })
  item: Item;

  @Column()
  quantity: number;

  @Column()
  procured_date: Date;
} 