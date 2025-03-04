import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';
import { CreateBuildingDto } from './building.dto';
import { BaseService } from '../common/base.service';
import { Contract } from '../contract/contract.entity';

@Injectable()
export class BuildingService extends BaseService<Building> {
    constructor(
        @InjectRepository(Building)
        private readonly buildingRepository: Repository<Building>,
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>
    ) {
        super(buildingRepository);
    }

    async getBuildingContracts(buildingId: number): Promise<Contract[]> {
        const contracts = await this.contractRepository
            .createQueryBuilder('contract')
            .innerJoin('contract.room', 'room')
            .innerJoin('room.floor', 'floor')
            .innerJoin('floor.building', 'building')
            .where('building.id = :buildingId', { buildingId })
            .getMany();

        if (!contracts.length) {
            const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
            if (!building) {
                throw new NotFoundException(`Building with ID ${buildingId} not found`);
            }
        }

        return contracts;
    }

    // Additional methods can be added here
} 