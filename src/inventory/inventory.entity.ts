import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from '../item/item.entity';
import { BaseEntity } from '../common/base.entity';
import { Building } from 'src/building/building.entity';
@Entity()
export class Inventory extends BaseEntity {


  @ManyToOne(() => Item, { eager: true })
  item: Item;

  @Column()
  quantity: number;

  @Column()
  procured_date: Date;

  @Column()
  status: string;

  @Column()
  description: string;

  @ManyToOne(() => Building, { eager: true })
  building: Building;
} 