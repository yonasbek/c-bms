import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Building } from './building.entity';
import { CreateBuildingDto } from './building.dto';
import { BaseService } from '../common/base.service';
import { Contract } from '../contract/contract.entity';
import { Payment } from 'src/payment/payment.entity';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class BuildingService extends BaseService<Building> {
    constructor(
        @InjectRepository(Building)
        private readonly buildingRepository: Repository<Building>,
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>,
        private readonly paymentService: PaymentService
    ) {
        super(buildingRepository);
    }

    async getBuildingContracts(buildingId: number): Promise<Contract[]> {
        const contracts = await this.contractRepository
            .createQueryBuilder('contract')
            .leftJoinAndSelect('contract.user', 'user')
            .leftJoinAndSelect('contract.room', 'room')
            .leftJoinAndSelect('room.floor', 'floor')
            .leftJoinAndSelect('floor.building', 'building')
            .where('building.id = :buildingId', { buildingId })
            .getMany();

        if (!contracts.length) {
            const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
            if (!building) {
                throw new NotFoundException(`Building with ID ${buildingId} not found`);
            }
        }

        const payments = await this.paymentService.findAll({ where: { contractId: In(contracts.map(contract => contract.id)) } });
        contracts.forEach(contract => {
            contract.payments = payments.filter(payment => payment.contractId === contract.id);
        });
        return contracts;
    }

    // Additional methods can be added here
} 