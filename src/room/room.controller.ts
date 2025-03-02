import { Controller } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('room')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class RoomController extends BaseController<Room> {
    constructor(private readonly roomService: RoomService) {
        super(roomService);
    }

    // Additional endpoints can be added here
} 