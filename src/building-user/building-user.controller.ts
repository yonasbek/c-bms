import { Controller, Get, Param } from '@nestjs/common';
import { BuildingUserService } from './building-user.service';
import { BuildingUser } from './building-user.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetBuildingUserByBuildingIdDto } from './building-user.dto';

@Controller('building-user')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class BuildingUserController extends BaseController<BuildingUser> {
    constructor(private readonly buildingUserService: BuildingUserService) {
        super(buildingUserService);
    }
    @Get('building/:buildingId')
    @ApiOperation({ summary: 'Get building users by building id' })
    @ApiBody({ type: GetBuildingUserByBuildingIdDto })
    @ApiResponse({ status: 200, description: 'Building users retrieved successfully' })
    async getBuildingUserByBuildingId(@Param('buildingId') getBuildingUserByBuildingIdDto: GetBuildingUserByBuildingIdDto): Promise<BuildingUser[]> {
        return this.buildingUserService.getBuildingUserByBuildingId(getBuildingUserByBuildingIdDto);
    }
} 