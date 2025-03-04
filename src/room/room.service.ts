import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { BaseService } from '../common/base.service';

@Injectable()
export class RoomService extends BaseService<Room> {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) {
        super(roomRepository);
    }

    async getRoomByFloorId(floorId: number): Promise<Room[]> {
        return this.roomRepository.find({ where: { floorId: floorId } });
    }
    async getRoomByBuildingId(buildingId: number): Promise<Room[]> {
        return this.roomRepository.find({ where: { floor: { buildingId: buildingId } } });
    }

    // Additional methods can be added here
} 