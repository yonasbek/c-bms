import { Controller, Get, Post, Body, UseGuards, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto, GetMaintenanceRequestByRoomIdDto } from './maintenance.dto';
import { MaintenanceRequest } from './maintenance.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import upload from '../config/multer.config'; // Import multer config

@Controller('maintenance')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class MaintenanceController extends BaseController<MaintenanceRequest> {
  constructor(private readonly maintenanceService: MaintenanceService) {
    super(maintenanceService);
  }
  @Get('building/:buildingId')
  @ApiOperation({ summary: 'Get maintenance requests by building id' })
  @ApiResponse({ status: 200, description: 'Maintenance requests retrieved successfully' })
  async getMaintenanceRequestByBuildingId(@Param('buildingId') buildingId: number): Promise<MaintenanceRequest[]> {
    return this.maintenanceService.getMaintenanceRequestByBuildingId(buildingId);
  }

  
} 