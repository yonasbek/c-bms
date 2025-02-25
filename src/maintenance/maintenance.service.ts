import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceRequest } from './maintenance.entity';
import { CreateMaintenanceDto } from './maintenance.dto';

@Injectable()
export class MaintenanceService extends BaseService<MaintenanceRequest> {
  constructor(@InjectRepository(MaintenanceRequest) repository: Repository<MaintenanceRequest>) {
    super(repository);
  }

  async create(createMaintenanceDto: CreateMaintenanceDto): Promise<MaintenanceRequest> {
    const request = this.repository.create(createMaintenanceDto);
    return this.repository.save(request);
  }

  async findAll(): Promise<MaintenanceRequest[]> {
    return this.repository.find();
  }
} 