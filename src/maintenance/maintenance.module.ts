import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRequest } from './maintenance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceRequest])],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {} 