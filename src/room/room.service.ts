import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { BaseService } from '../common/base.service';
import { UpdateRoomDto } from './room.dto';

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

    async updateRoom(roomId: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        
        if (!room) {
            throw new NotFoundException(`Room with ID ${roomId} not found`);
        }

        // Update room properties
        Object.assign(room, updateRoomDto);
        
        return this.roomRepository.save(room);
    }

    // Additional methods can be added here
} 