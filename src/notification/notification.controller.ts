import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './notification.dto';
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

} 