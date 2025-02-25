import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './account.dto';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(@InjectRepository(Account) repository: Repository<Account>) {
    super(repository);
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.repository.create(createAccountDto);
    return this.repository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.repository.find();
  }
} 