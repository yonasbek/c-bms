import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './room.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class RoomService extends BaseService<Room> {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) {
        super(roomRepository);
    }

    async create(createRoomDto: CreateRoomDto): Promise<Room> {
        const room = this.roomRepository.create(createRoomDto);
        return this.roomRepository.save(room);
    }

    // Additional methods can be added here
} 