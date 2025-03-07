import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubContract } from './subcontract.entity';
import { CreateSubContractDto } from './subcontract.dto';

@Injectable()
export class SubContractService extends BaseService<SubContract> {
  constructor(@InjectRepository(SubContract) repository: Repository<SubContract>) {
    super(repository);
  }

  async getSubContractsByBuildingId(buildingId: string): Promise<SubContract[]> {
    return this.repository.find({ where: { buildingId } });
  }
} 