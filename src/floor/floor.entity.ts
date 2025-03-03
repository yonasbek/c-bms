import { BaseEntity } from '../common/base.entity'; // Adjust the path as necessary
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Building } from '../building/building.entity'; // Import the Building entity
import { Room } from '../room/room.entity'; // Import the Room entity

@Entity('floor')
export class Floor extends BaseEntity {
    @Column()
    name: string;

    @Column()
    buildingId: number;

    @ManyToOne(() => Building, (building) => building.floors, { eager: true }) // Establish foreign key relationship with Building
    @JoinColumn({ name: 'buildingId' }) // Explicitly define the foreign key column
    building: Building;

    @OneToMany(() => Room, (room) => room.floor)
    rooms: Room[];
} 