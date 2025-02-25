import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }
}
