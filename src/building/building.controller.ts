import { Controller, UseGuards } from '@nestjs/common';
import { BuildingService } from './building.service';
import { Building } from './building.entity';
import { BaseController } from '../common/base.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('building')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)    
export class BuildingController extends BaseController<Building> {
    constructor(private readonly buildingService: BuildingService) {
        super(buildingService);
    }

    // Additional endpoints can be added here
} 