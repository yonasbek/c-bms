import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';
import { CreateBuildingDto } from './building.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class BuildingService extends BaseService<Building> {
    constructor(
        @InjectRepository(Building)
        private readonly buildingRepository: Repository<Building>,
    ) {
        super(buildingRepository);
    }

    // Additional methods can be added here
} 