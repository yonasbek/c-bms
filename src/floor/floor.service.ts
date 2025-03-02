import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Floor } from './floor.entity';
import { CreateFloorDto } from './floor.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class FloorService extends BaseService<Floor> {
    constructor(
        @InjectRepository(Floor)
        private readonly floorRepository: Repository<Floor>,
    ) {
        super(floorRepository);
    }

    async create(createFloorDto: CreateFloorDto): Promise<Floor> {
        const floor = this.floorRepository.create(createFloorDto);
        return this.floorRepository.save(floor);
    }

    // Additional methods can be added here
} 