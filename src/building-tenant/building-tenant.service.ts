import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuildingTenant } from './building-tenant.entity';
import { BaseService } from '../common/base.service';

@Injectable()
export class BuildingTenantService extends BaseService<BuildingTenant> {
    constructor(
        @InjectRepository(BuildingTenant)
        private readonly buildingTenantRepository: Repository<BuildingTenant>,
    ) {
        super(buildingTenantRepository);
    }

    async getBuildingTenantByBuildingId(buildingId: number): Promise<BuildingTenant[]> {
        return this.buildingTenantRepository.find({ where: { buildingId } });
    }
} 