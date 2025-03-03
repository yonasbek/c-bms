import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';

@Injectable()
export class ContractService extends BaseService<Contract> {
  constructor(@InjectRepository(Contract) repository: Repository<Contract>) {
    super(repository);
  }

  async getContractByRoomId(roomId: number): Promise<Contract[]> {
    return this.repository.find({ where: { roomId: roomId } });
  }
} 