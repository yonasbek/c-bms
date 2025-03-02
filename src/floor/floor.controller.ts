import { Controller } from '@nestjs/common';
import { FloorService } from './floor.service';
import { Floor } from './floor.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('floor')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class FloorController extends BaseController<Floor> {
    constructor(private readonly floorService: FloorService) {
        super(floorService);
    }

    // Additional endpoints can be added here
} 