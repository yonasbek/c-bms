import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto, GetRoomByFloorIdDto } from './room.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class RoomService extends BaseService<Room> {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) {
        super(roomRepository);
    }

    async getRoomByFloorId(getRoomByFloorIdDto: GetRoomByFloorIdDto): Promise<Room[]> {
        return this.roomRepository.find({ where: { floorId: getRoomByFloorIdDto.floorId } });
    }

    // Additional methods can be added here
} 