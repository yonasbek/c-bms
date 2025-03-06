import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './inventory.dto';
import { Inventory } from './inventory.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('inventory')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class InventoryController extends BaseController<Inventory> {
  constructor(private readonly inventoryService: InventoryService) {
    super(inventoryService);
  }
  @Get('building/:buildingId')
  @ApiOperation({ summary: 'Get maintenance requests by building id' })
  @ApiResponse({ status: 200, description: 'Maintenance requests retrieved successfully' })
  async getInventoryByBuildingId(@Param('buildingId') buildingId: number): Promise<Inventory[]> {
    return this.inventoryService.getInventoryByBuildingId(buildingId);
  }
  
} 