import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { CreateContractDto } from './contract.dto';

@Injectable()
export class ContractService extends BaseService<Contract> {
  constructor(@InjectRepository(Contract) repository: Repository<Contract>) {
    super(repository);
  }

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const contract = this.repository.create(createContractDto);
    return this.repository.save(contract);
  }

  async findAll(): Promise<Contract[]> {
    return this.repository.find();
  }
} 