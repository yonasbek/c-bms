import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './item.dto';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class ItemService extends BaseService<Item> {
  constructor(@InjectRepository(Item) repository: Repository<Item>) {
    super(repository);
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.repository.create(createItemDto);
    return this.repository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.repository.find();
  }
} 