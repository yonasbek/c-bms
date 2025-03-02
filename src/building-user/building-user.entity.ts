import { BaseEntity } from '../common/base.entity'; // Adjust the path as necessary
import { Entity, Column, ManyToOne } from 'typeorm';
import { Building } from '../building/building.entity'; // Import the Building entity
import { User } from '../users/users.entity'; // Import the User entity

@Entity('building_user')
export class BuildingUser extends BaseEntity {
    @ManyToOne(() => Building, { eager: true }) // Establish foreign key relationship with Building
    building: Building;

    @ManyToOne(() => User, { eager: false }) // Establish foreign key relationship with User
    user: User;
} 