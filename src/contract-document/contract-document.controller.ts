import { Controller, Post, Get, Param, UseInterceptors, UploadedFiles, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ContractDocumentService } from './contract-document.service';
import { CreateContractDocumentDto, MultipleFilesDto } from './contract-document.dto';
import { ContractDocument } from './contract-document.entity';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import upload from '../config/multer.config';

@ApiTags('Contract Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contract-documents')
export class ContractDocumentController {
  constructor(private readonly contractDocumentService: ContractDocumentService) {}

  @Post('upload/:contractId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10, { storage: upload.storage }))
  async uploadMultipleFiles(
    @UploadedFiles() files:any,
    @Param('contractId') contractId: number,
  ) {
    console.log(files);
    const documents: CreateContractDocumentDto[] = files.map(file => ({
      contractId,
      document_name: file.originalname,
      document_url: file.path,
      document_type: file.mimetype,
      document_size: file.size,
    }));

    return this.contractDocumentService.createMultipleDocuments(documents);
  }

  @Get('contract/:contractId')
  async getDocumentsByContractId(@Param('contractId') contractId: number): Promise<ContractDocument[]> {
    return this.contractDocumentService.getDocumentsByContractId(contractId);
  }
} 