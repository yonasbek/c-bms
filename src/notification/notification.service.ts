import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './notification.dto';
import { BaseService } from '../common/base.service';
import { User } from '../users/users.entity';

@Injectable()
export class NotificationService extends BaseService<Notification> {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(notificationRepository);
    }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const notification = this.notificationRepository.create({
            type: createNotificationDto.type,
            message: createNotificationDto.message,
            userId: createNotificationDto.userId || null,
            buildingId: createNotificationDto.buildingId
        });

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
