import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BuildingTenantService } from './building-tenant.service';
import { BuildingTenant } from './building-tenant.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Building Tenants')
@Controller('building-tenant')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BuildingTenantController extends BaseController<BuildingTenant> {
    constructor(private readonly buildingTenantService: BuildingTenantService) {
        super(buildingTenantService);
    }

    @Get('building/:buildingId')
    @ApiOperation({ summary: 'Get building tenants by building id' })
    @ApiResponse({ status: 200, description: 'Building tenants retrieved successfully' })
    async getBuildingTenantByBuildingId(@Param('buildingId') buildingId: number): Promise<BuildingTenant[]> {
        return this.buildingTenantService.getBuildingTenantByBuildingId(buildingId);
    }
} 