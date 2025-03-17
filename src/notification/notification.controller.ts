import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { NotificationService } from './notification.service';
import { CreateBulkNotificationDto, CreateSingleNotificationDto } from './notification.dto';
import { Notification } from './notification.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('notifications')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class NotificationController extends BaseController<Notification> {
  constructor(private readonly notificationService: NotificationService) {
    super(notificationService);
  }

  @Post('bulk')
  async createBulkNotification(@Body() createBulkNotificationDto: CreateBulkNotificationDto) {
    return this.notificationService.createBulkNotification(createBulkNotificationDto);
  }

  @Post('single')
  async createSingleNotification(@Body() createSingleNotificationDto: CreateSingleNotificationDto) {
    return this.notificationService.createSingleNotification(createSingleNotificationDto);
  }

} 