import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from '../item/item.entity';
import { BaseEntity } from '../common/base.entity';
import { Building } from 'src/building/building.entity';
@Entity()
export class Inventory extends BaseEntity {

  @Column()
  itemId: number;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'itemId' }) // Explicitly define the foreign key column
  item: Item;

  @Column()
  quantity: number;

  @Column()
  procured_date: Date;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column()
  buildingId: number;

  @ManyToOne(() => Building, { eager: true })
  @JoinColumn({ name: 'buildingId' }) // Explicitly define the foreign key column
  building: Building;
} 