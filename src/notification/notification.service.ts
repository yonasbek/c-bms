import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './notification.dto';
import { BaseService } from '../common/base.service';
import { User } from '../users/users.entity';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class NotificationService extends BaseService<Notification> {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly httpService: HttpService
    ) {
        super(notificationRepository);
    }

    async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const notification = this.notificationRepository.create({
            type: createNotificationDto.type,
            message: createNotificationDto.message,
            userId: createNotificationDto.userId || null,
            buildingId: createNotificationDto.buildingId
        });
        console.log('inside createNotification');
          if(createNotificationDto.userId)
          {
            console.log('individual notification');
            const user = await this.userRepository.findOne({ 
              where: { id: createNotificationDto.userId }
            });
           let result = await this.sendSms(user.phone, createNotificationDto.message);
           console.log('result', result);
          }
          else{
            // bulk logic here
          }

        const savedNotification = await this.notificationRepository.save(notification);

        // If this is an individual notification, load the user
        if (savedNotification.userId) {
            return this.notificationRepository.findOne({ 
                where: { id: savedNotification.id }, 
                relations: ['user'] 
            });
        }

        return savedNotification;
    }

    async sendSms(receiver: string, message: string): Promise<boolean> {
      const url = 'https://api.afromessage.com/api/send';
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiTzBXTjMzM01VV1lYWWlmVHZPVGxPajgxWkZDZThTUjAiLCJleHAiOjE4OTk5NzEwMTcsImlhdCI6MTc0MjIwNDYxNywianRpIjoiZTgxMTNhNGEtYjIxNC00YTJjLWE5NjAtYjRlNGJlNzRkMmQyIn0.Wiop-cRRaWx3UxtQwy06imQQDH-zQqxOfSxx-DQTwOM";
      const from = 'e80ad9d8-adf3-463f-80f4-7c4b39f7f164';
      const sender = '';
      const callback = 'YOUR_CALLBACK';
  
      try {
        const response = await this.httpService.get(`${url}?from=${from}&to=${receiver}&message=${encodeURIComponent(message)}&callback=${callback}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).toPromise();
  
        if (response.status === 200 && response.data.acknowledge === 'success') {
          console.log('success message');
          return true;
        } else {
          console.log('error message', response.data);
          return false;
        }
      } catch (error) {
        console.log('error', error);
        return false;
      }
    }

    async getBuildingNotifications(buildingId: number): Promise<Notification[]> {
        // Get all notifications for the building
        const notifications = await this.notificationRepository.find({
            where: { buildingId },
            relations: ['building'],
            order: { created_at: 'DESC' }
        });

        // For notifications with userId, load the user
        for (const notification of notifications) {
            if (notification.userId) {
                notification.user = await this.userRepository.findOne({
                    where: { id: notification.userId }
                });
            }
        }

        return notifications;
    }

    async getUserNotifications(userId: number): Promise<Notification[]> {
        // Get all notifications for this specific user and all group notifications for their buildings
        const userNotifications = await this.notificationRepository.find({
            where: [
                { userId },
                { userId: null } // Group notifications
            ],
            relations: ['building'],
            order: { created_at: 'DESC' }
        });

        // Filter to only include group notifications for buildings the user belongs to
        const userBuildingIds = [...new Set(userNotifications.map(n => n.buildingId))];
        
        return userNotifications.filter(notification => 
            notification.userId === userId || 
            (notification.userId === null && userBuildingIds.includes(notification.buildingId))
        );
    }

    async findAll(): Promise<Notification[]> {
        const notifications = await this.notificationRepository.find({
            relations: ['building'],
            order: { created_at: 'DESC' }
        });

        // For notifications with userId, load the user
        for (const notification of notifications) {
            if (notification.userId) {
                notification.user = await this.userRepository.findOne({
                    where: { id: notification.userId }
                });
            }
        }

        return notifications;
    }
} 
