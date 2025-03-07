import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { SubContractService } from './subcontract.service';
import { CreateSubContractDto } from './subcontract.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SubContract } from './subcontract.entity';

@Controller('subcontract')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SubContractController extends BaseController<SubContract> {
  constructor(private readonly subContractService: SubContractService) {
    super(subContractService);
  }

  @Get('building/:buildingId')
  @ApiOperation({ summary: 'Get subcontracts by building ID' })
  @ApiParam({ name: 'buildingId', type: String, description: 'The ID of the building' })
  async getSubContractsByBuildingId(@Param('buildingId') buildingId: string) {
    return this.subContractService.getSubContractsByBuildingId(buildingId);
  }

} 