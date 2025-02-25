import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './inventory.dto';
import { Inventory } from './inventory.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('inventory')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class InventoryController extends BaseController<Inventory> {
  constructor(private readonly inventoryService: InventoryService) {
    super(inventoryService);
  }

  
} 