import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('items')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class ItemController extends BaseController<Item> {
  constructor(private readonly itemService: ItemService) {
    super(itemService);
  }
} 