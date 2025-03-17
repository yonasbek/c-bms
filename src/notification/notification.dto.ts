import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

// Define notification types as an enum for better type safety
export enum NotificationType {
    CONTRACT = 'contract',
    PAYMENT = 'payment',
    MAINTENANCE = 'maintenance',
    ANNOUNCEMENT = 'announcement',
    OTHER = 'other'
}

export class NotificationResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ enum: NotificationType })
    type: NotificationType;

    @ApiProperty({ example: 'A new contract has been created' })
    message: string;

    @ApiProperty({ 
        example: 1, 
        description: 'User ID if notification is for a specific user, null if for all building users',
        required: false
    })
    userId?: number;

    @ApiProperty()
    user?: any;

    @ApiProperty({ example: 1 })
    buildingId: number;

    @ApiProperty()
    building: any;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    modified_at: Date;
}

export class CreateNotificationDto {

    @ApiProperty({ 
        enum: NotificationType,
        example: NotificationType.CONTRACT,
        description: 'Type of notification'
    })
    @IsNotEmpty()
    @IsEnum(NotificationType)
    type: NotificationType;

    @ApiProperty({ example: 'A new contract has been created' })
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty({ 
        example: 1,
        description: 'User ID if notification is for a specific user, omit if for all building users',
        required: false
    })
    @IsOptional()
    @IsNumber()
    userId?: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    buildingId: number;
}

export class CreateUserNotificationDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    notificationId: number;
} 