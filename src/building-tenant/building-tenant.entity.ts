import { BaseEntity } from '../common/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Building } from '../building/building.entity';
import { User } from '../users/users.entity';

@Entity('building_tenant')
export class BuildingTenant extends BaseEntity {
    @Column({ nullable: false }) 
    userId: number;

    @Column({ nullable: false }) 
    buildingId: number;

    @Column({ nullable: false }) 
    tin_number: string;

    @ManyToOne(() => Building, { eager: true })
    @JoinColumn({ name: 'buildingId' })
    building: Building;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;
} 