import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import {  CreateNotificationDto, NotificationResponseDto, NotificationType } from './notification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new notification' })
    @ApiBody({ type: CreateNotificationDto })
    @ApiResponse({ status: 201, description: 'Notification created successfully' })
    async create(@Body() createNotificationDto: CreateNotificationDto): Promise<NotificationResponseDto> {
        const notification = await this.notificationService.createNotification(createNotificationDto);
        return this.transformToResponseDto(notification);
    }

    @Get('building/:buildingId')
    @ApiOperation({ summary: 'Get all notifications for a building' })
    @ApiParam({ name: 'buildingId', description: 'Building ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'List of notifications for the building',
        type: [NotificationResponseDto]
    })
    async getBuildingNotifications(@Param('buildingId') buildingId: number): Promise<NotificationResponseDto[]> {
        const notifications = await this.notificationService.getBuildingNotifications(buildingId);
        return notifications.map(notification => this.transformToResponseDto(notification));
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get all notifications for a user' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'List of notifications for the user',
        type: [NotificationResponseDto]
    })
    async getUserNotifications(@Param('userId') userId: number): Promise<NotificationResponseDto[]> {
        const notifications = await this.notificationService.getUserNotifications(userId);
        return notifications.map(notification => this.transformToResponseDto(notification));
    }

    @Get()
    @ApiOperation({ summary: 'Get all notifications' })
    @ApiResponse({ 
        status: 200, 
        description: 'List of all notifications',
        type: [NotificationResponseDto]
    })
    async getAllNotifications(): Promise<NotificationResponseDto[]> {
        const notifications = await this.notificationService.findAll();
        return notifications.map(notification => this.transformToResponseDto(notification));
    }

    private transformToResponseDto(notification: Notification): NotificationResponseDto {
        return {
            id: notification.id,
            type: notification.type as NotificationType,
            message: notification.message,
            userId: notification.userId,
            user: notification.user,
            buildingId: notification.buildingId,
            building: notification.building,
            created_at: notification.created_at,
            modified_at: notification.modified_at
        };
    }
} 