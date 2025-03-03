import { Controller, Get, Param } from '@nestjs/common';
import { BuildingUserService } from './building-user.service';
import { BuildingUser } from './building-user.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('building-user')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class BuildingUserController extends BaseController<BuildingUser> {
    constructor(private readonly buildingUserService: BuildingUserService) {
        super(buildingUserService);
    }
    @Get('building/:buildingId')
    @ApiOperation({ summary: 'Get building users by building id' })
    @ApiResponse({ status: 200, description: 'Building users retrieved successfully' })
    async getBuildingUserByBuildingId(@Param('userId') userId: number): Promise<BuildingUser[]> {
        return this.buildingUserService.getBuildingUserByBuildingId(userId);
    }
} 