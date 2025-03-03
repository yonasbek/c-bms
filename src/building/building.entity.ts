import { Floor } from 'src/floor/floor.entity';
import { BaseEntity } from '../common/base.entity'; // Adjust the path as necessary
import { Entity, Column, OneToMany } from 'typeorm';
import { BuildingUser } from 'src/building-user/building-user.entity';

@Entity('building')
export class Building extends BaseEntity {
    @Column()
    name: string;

    @Column()
    address: string;

    @OneToMany(() => Floor, (floor) => floor.building)
    floors: Floor[];

    @OneToMany(() => BuildingUser, (buildingUser) => buildingUser.building)
    buildingUsers: BuildingUser[];

    // Add other relevant fields as necessary
} 