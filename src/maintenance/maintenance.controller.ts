import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './maintenance.dto';
import { MaintenanceRequest } from './maintenance.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('maintenance')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class MaintenanceController extends BaseController<MaintenanceRequest> {
  constructor(private readonly maintenanceService: MaintenanceService) {
    super(maintenanceService);
  }

} 