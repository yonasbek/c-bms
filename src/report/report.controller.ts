import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('building_report/:id')
  @ApiOperation({ summary: 'Get system-wide statistics' })
  @ApiResponse({ status: 200, description: 'Returns system statistics' })
  async getBuildingReport(@Param('id') id: string) {
    return this.reportService.generateReport(id);
  }

  // @Get('contract-stats')
  // @ApiOperation({ summary: 'Get contract-related statistics' })
  // @ApiResponse({ status: 200, description: 'Returns contract statistics' })
  // async getContractStats() {
  //   return this.reportService.getContractStats();
  // }

  // @Get('room-stats')
  // @ApiOperation({ summary: 'Get room-related statistics' })
  // @ApiResponse({ status: 200, description: 'Returns room statistics' })
  // async getRoomStats() {
  //   return this.reportService.getRoomStats();
  // }

  // @Get('payment-stats')
  // @ApiOperation({ summary: 'Get payment-related statistics' })
  // @ApiResponse({ status: 200, description: 'Returns payment statistics' })
  // async getPaymentStats() {
  //   return this.reportService.getPaymentStats();
  // }
} 