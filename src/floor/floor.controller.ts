import { Controller, Get, Param } from '@nestjs/common';
import { FloorService } from './floor.service';
import { Floor } from './floor.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetFloorByBuildingIdDto } from './floor.dto';

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
    @ApiBody({ type: GetFloorByBuildingIdDto })
    async getFloorByBuildingId(@Param('buildingId') getFloorByBuildingIdDto: GetFloorByBuildingIdDto): Promise<Floor[]> {
        return this.floorService.getFloorByBuildingId(getFloorByBuildingIdDto);
    }

    // Additional endpoints can be added here
} 