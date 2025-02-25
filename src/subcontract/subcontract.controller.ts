import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { SubContractService } from './subcontract.service';
import { CreateSubContractDto } from './subcontract.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SubContract } from './subcontract.entity';

@Controller('subcontract')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SubContractController extends BaseController<SubContract> {
  constructor(private readonly subContractService: SubContractService) {
    super(subContractService);
  }


} 