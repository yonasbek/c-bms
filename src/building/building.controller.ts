import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { BuildingService } from './building.service';
import { Building } from './building.entity';
import { BaseController } from '../common/base.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contract } from '../contract/contract.entity';

@ApiTags('Buildings')
@Controller('building')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)    
export class BuildingController extends BaseController<Building> {
    constructor(private readonly buildingService: BuildingService) {
        super(buildingService);
    }

    @Get(':id/contracts')
    @ApiOperation({ summary: 'Get all contracts for a building' })
    @ApiParam({ name: 'id', description: 'Building ID' })
    @ApiResponse({ status: 200, description: 'Returns all contracts associated with the building' })
    @ApiResponse({ status: 404, description: 'Building not found' })
    async getBuildingContracts(@Param('id') id: number): Promise<Contract[]> {
        return this.buildingService.getBuildingContracts(id);
    }

    // Additional endpoints can be added here
} 