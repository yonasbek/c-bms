import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { ContractService } from './contract.service';
import { CreateContractDto } from './contract.dto';
import { Contract } from './contract.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('contracts')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class ContractController extends BaseController<Contract> {
  constructor(private readonly contractService: ContractService) {
    super(contractService);
  }


} 