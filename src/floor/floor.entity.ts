import { BaseEntity } from '../common/base.entity'; // Adjust the path as necessary
import { Entity, Column, ManyToOne, OneToMany    } from 'typeorm';
import { Building } from '../building/building.entity'; // Import the Building entity
import { Room } from '../room/room.entity'; // Import the Room entity

@Entity('floor')
export class Floor extends BaseEntity {
    @Column()
    name: string;

    @ManyToOne(() => Building, (building) => building.floors, { eager: true }) // Establish foreign key relationship with Building
    building: Building;

    @OneToMany(() => Room, (room) => room.floor)
    rooms: Room[];
} 