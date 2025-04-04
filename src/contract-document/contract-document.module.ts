import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractDocument } from './contract-document.entity';
import { ContractDocumentService } from './contract-document.service';
import { ContractDocumentController } from './contract-document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContractDocument])],
  controllers: [ContractDocumentController],
  providers: [ContractDocumentService],
  exports: [ContractDocumentService],
})
export class ContractDocumentModule {} 