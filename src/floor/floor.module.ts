import { Module } from '@nestjs/common';
import { FloorController } from './floor.controller';
import { FloorService } from './floor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from './floor.entity';
import { Building } from '../building/building.entity'; // Import Building entity

@Module({
    imports: [TypeOrmModule.forFeature([Floor, Building])],
    controllers: [FloorController],
    providers: [FloorService],
})
export class FloorModule {} 