import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BaseService } from '../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateBulkNotificationDto, CreateSingleNotificationDto } from './notification.dto';
import { BuildingTenant } from 'src/building-tenant/building-tenant.entity';
import { User } from 'src/users/users.entity';
@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(
    @InjectRepository(Notification) repository: Repository<Notification>,
    private httpService: HttpService,
    @InjectRepository(BuildingTenant)
    private readonly buildingTenantRepository: Repository<BuildingTenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(repository);
  }

  async createBulkNotification(createBulkNotificationDto: CreateBulkNotificationDto): Promise<boolean> {
    try {
    createBulkNotificationDto.tenant_ids.forEach(async (tenant_id) => {
      let notification = new Notification();
      notification.message = createBulkNotificationDto.message;
      notification.type = createBulkNotificationDto.type;
      notification.group_type = createBulkNotificationDto.group_type;
      notification.tenant_id = tenant_id;
      const result = this.repository.create(notification);
      const buildingTenant = await this.buildingTenantRepository.findOne({ where: { id: tenant_id as any } });
      const user = await this.userRepository.findOne({ where: { id: buildingTenant.userId } });
      // const sms = await this.sendSms(user.phone, createBulkNotificationDto.message);
      // if (sms) {
      //   this.repository.save(result);
      // }
    });
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
  }

  async createSingleNotification(createSingleNotificationDto: CreateSingleNotificationDto): Promise<Notification> {
    try {
      let notification = new Notification();
      notification.message = createSingleNotificationDto.message;
      notification.type = createSingleNotificationDto.type;
      notification.group_type = createSingleNotificationDto.group_type;
      notification.tenant_id = createSingleNotificationDto.tenant_id;
      const result = this.repository.create(notification);
      const buildingTenant = await this.buildingTenantRepository.findOne({ where: { id: createSingleNotificationDto.tenant_id as any } });
      const user = await this.userRepository.findOne({ where: { id: buildingTenant.userId } });
      // const sms = await this.sendSms(user.phone, createSingleNotificationDto.message);
      // if (sms) {
      //   this.repository.save(result);
      // }
      return result;
    }
    catch (error) {
      console.log(error);
      return null;
    }
  }

  
} 
