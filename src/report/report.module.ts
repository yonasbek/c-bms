import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { Contract } from '../contract/contract.entity';
import { Room } from '../room/room.entity';
import { User } from '../users/users.entity';
import { Payment } from '../payment/payment.entity';
import { ContractDocument } from '../contract-document/contract-document.entity';
import { MaintenanceRequest } from 'src/maintenance/maintenance.entity';
import { BuildingTenant } from 'src/building-tenant/building-tenant.entity';
import { Floor } from 'src/floor/floor.entity';
import { SubContract } from 'src/subcontract/subcontract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contract,
      Room,
      User,
      Payment,
      ContractDocument,
      MaintenanceRequest,
      BuildingTenant,
      Floor,
      SubContract
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {} 