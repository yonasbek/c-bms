import { Controller, Get, Post, Body, UseGuards, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { ContractService } from './contract.service';
import { CreateContractDto } from './contract.dto';
import { Contract } from './contract.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import upload from '../config/multer.config'; // Import multer config
import { FileDto } from './contract.dto';

@Controller('contracts')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class ContractController extends BaseController<Contract> {
  constructor(private readonly contractService: ContractService) {
    super(contractService);
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get contracts by room id' })
  @ApiResponse({ status: 200, description: 'Contracts retrieved successfully' })
  async getContractByRoomId(@Param('roomId') roomId: number): Promise<Contract[]> {
    return this.contractService.getContractByRoomId(roomId);
  }

  @Post('upload/:contractId')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiBody({ type: FileDto })
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  @UseInterceptors(FileInterceptor('file', { storage: upload.storage }))
  uploadFile(@UploadedFile() file: any, @Param('contractId') contractId: number) {
    console.log(file);
    if (!contractId) {
      throw new Error('Contract ID is required for the update.');
    }    // Update the contract with the new file URL or set it to null if needed
    const updateData = { file_url: file.path || null }; // Allow null if no file is uploaded
    let value = this.contractService.update(contractId, updateData);
    return { fileUrl: file.path, message: 'File uploaded successfully' }; // Return the file URL
  }
} 