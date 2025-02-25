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

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const item = this.repository.create(createInventoryDto);
    return this.repository.save(item);
  }

  async findAll(): Promise<Inventory[]> {
    return this.repository.find();
  }
} 