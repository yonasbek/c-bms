import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { CreateInventoryDto } from './inventory.dto';

@Injectable()
export class InventoryService extends BaseService<Inventory> {
  constructor(@InjectRepository(Inventory) repository: Repository<Inventory>) {
    super(repository);
  }

  async getInventoryByBuildingId(buildingId: number): Promise<Inventory[]> {
    return this.repository.find({ where: { buildingId: buildingId } });
  }

} 