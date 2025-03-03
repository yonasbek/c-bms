import { Controller, Get, Param } from '@nestjs/common';
import { FloorService } from './floor.service';
import { Floor } from './floor.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('floor')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class FloorController extends BaseController<Floor> {
    constructor(private readonly floorService: FloorService) {
        super(floorService);
    }

    @Get('building/:buildingId')
    @ApiOperation({ summary: 'Get floors by building id' })
    @ApiResponse({ status: 200, description: 'Floors retrieved successfully' })
    async getFloorByBuildingId(@Param('buildingId') buildingId: number): Promise<Floor[]> {
        return this.floorService.getFloorByBuildingId(buildingId);
    }

    // Additional endpoints can be added here
} 