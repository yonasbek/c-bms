import { BaseEntity } from '../common/base.entity'; // Adjust the path as necessary
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Floor } from '../floor/floor.entity'; // Import the Floor entity
import { User } from '../users/users.entity'; // Import the User entity

@Entity('room')
export class Room extends BaseEntity {
    @Column()
    name: string;

    @Column()
    floorId: number;

    @ManyToOne(() => Floor, (floor) => floor.rooms, { eager: true }) // Establish foreign key relationship with Floor
    @JoinColumn({ name: 'floorId' }) // Explicitly define the foreign key column
    floor: Floor;

    @Column()
    room_number: string;

    @Column()
    room_size: string;

    @Column()
    description: string;

    @Column()
    room_status: string;
    
} 