import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractDocument } from './contract-document.entity';
import { CreateContractDocumentDto } from './contract-document.dto';

@Injectable()
export class ContractDocumentService extends BaseService<ContractDocument> {
  constructor(
    @InjectRepository(ContractDocument)
    repository: Repository<ContractDocument>,
  ) {
    super(repository);
  }

  async createDocument(documentData: CreateContractDocumentDto): Promise<ContractDocument> {
    const document = this.repository.create(documentData);
    return this.repository.save(document);
  }

  async createMultipleDocuments(documents: CreateContractDocumentDto[]): Promise<ContractDocument[]> {
    const createdDocuments = this.repository.create(documents);
    return this.repository.save(createdDocuments);
  }

  async getDocumentsByContractId(contractId: number): Promise<ContractDocument[]> {
    return this.repository.find({ where: { contractId } });
  }
} 