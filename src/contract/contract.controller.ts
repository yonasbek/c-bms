import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { ContractService } from './contract.service';
import { CreateContractDto } from './contract.dto';
import { Contract } from './contract.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetContractByRoomIdDto } from './contract.dto';

@Controller('contracts')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class ContractController extends BaseController<Contract> {
  constructor(private readonly contractService: ContractService) {
    super(contractService);
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get contracts by room id' })
  @ApiBody({ type: GetContractByRoomIdDto })
  @ApiResponse({ status: 200, description: 'Contracts retrieved successfully' })
  async getContractByRoomId(@Param('roomId') getContractByRoomIdDto: GetContractByRoomIdDto): Promise<Contract[]> {
    return this.contractService.getContractByRoomId(getContractByRoomIdDto);
  }

} 