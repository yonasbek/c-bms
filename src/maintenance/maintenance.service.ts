import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceRequest } from './maintenance.entity';
import { CreateMaintenanceDto, GetMaintenanceRequestByRoomIdDto } from './maintenance.dto';

@Injectable()
export class MaintenanceService extends BaseService<MaintenanceRequest> {
  constructor(@InjectRepository(MaintenanceRequest) repository: Repository<MaintenanceRequest>) {
    super(repository);
  }

  async getMaintenanceRequestByBuildingId(buildingId: number): Promise<MaintenanceRequest[]> {
    return this.repository.find({ where: { contract: {room: {floor: {buildingId: buildingId}} } } });
  }
} 