import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './notification.dto';

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(@InjectRepository(Notification) repository: Repository<Notification>) {
    super(repository);
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.repository.create(createNotificationDto);
    return this.repository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.repository.find();
  }
} 