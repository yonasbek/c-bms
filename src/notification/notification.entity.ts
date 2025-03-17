import { BaseEntity } from 'src/common/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification extends BaseEntity {

  @Column()
  message: string;

  @Column()
  type: string;

  @Column()
  group_type: string;

  @Column()
  tenant_id: number;
} 