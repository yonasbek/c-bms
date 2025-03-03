import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { CreateContractDto, GetContractByRoomIdDto } from './contract.dto';

@Injectable()
export class ContractService extends BaseService<Contract> {
  constructor(@InjectRepository(Contract) repository: Repository<Contract>) {
    super(repository);
  }

  async getContractByRoomId(getContractByRoomIdDto: GetContractByRoomIdDto): Promise<Contract[]> {
    return this.repository.find({ where: { roomId: getContractByRoomIdDto.roomId } });
  }
} 