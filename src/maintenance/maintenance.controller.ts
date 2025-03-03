import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto, GetMaintenanceRequestByRoomIdDto } from './maintenance.dto';
import { MaintenanceRequest } from './maintenance.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('maintenance')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class MaintenanceController extends BaseController<MaintenanceRequest> {
  constructor(private readonly maintenanceService: MaintenanceService) {
    super(maintenanceService);
  }
  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get maintenance requests by room id' })
  @ApiBody({ type: GetMaintenanceRequestByRoomIdDto })
  @ApiResponse({ status: 200, description: 'Maintenance requests retrieved successfully' })
  async getMaintenanceRequestByRoomId(@Param('roomId') getMaintenanceRequestByRoomIdDto: GetMaintenanceRequestByRoomIdDto): Promise<MaintenanceRequest[]> {
    return this.maintenanceService.getMaintenanceRequestByRoomId(getMaintenanceRequestByRoomIdDto);
  }
} 