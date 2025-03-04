import { BaseEntity } from '../common/base.entity'; // Adjust the path as necessary
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Building } from '../building/building.entity'; // Import the Building entity
import { User } from '../users/users.entity'; // Import the User entity

@Entity('building_user')
export class BuildingUser extends BaseEntity {
    @Column({ nullable: false }) 
    userId: number; // Explicitly define the foreign key

    @Column({ nullable: false }) 
    buildingId: number; // Explicitly define the foreign key

    @ManyToOne(() => Building, { eager: true }) // Establish foreign key relationship with Building
    @JoinColumn({ name: 'buildingId' }) // Explicitly define the foreign key column
    building: Building;

    @ManyToOne(() => User, { eager: true }) // Establish foreign key relationship with User
    @JoinColumn({ name: 'userId' }) // Explicitly define the foreign key column
    user: User;
} 