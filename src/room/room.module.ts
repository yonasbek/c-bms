import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Floor } from '../floor/floor.entity'; // Import Floor entity

@Module({
    imports: [TypeOrmModule.forFeature([Room, Floor])],
    controllers: [RoomController],
    providers: [RoomService],
})
export class RoomModule {} 