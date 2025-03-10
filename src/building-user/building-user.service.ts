import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuildingUser } from './building-user.entity';
import { CreateBuildingUserDto } from './building-user.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class BuildingUserService extends BaseService<BuildingUser> {
    constructor(
        @InjectRepository(BuildingUser)
        private readonly buildingUserRepository: Repository<BuildingUser>,
    ) {
        super(buildingUserRepository);
    }

    async getBuildingUserByBuildingId(userId: number): Promise<BuildingUser[]> {
        return this.buildingUserRepository.find({ where: { userId: userId } });
    }

    // Additional methods can be added here
} 