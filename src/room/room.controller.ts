import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('room')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class RoomController extends BaseController<Room> {
    constructor(private readonly roomService: RoomService) {
        super(roomService);
    }

    @Get('floor/:floorId')
    @ApiOperation({ summary: 'Get rooms by floor id' })
    @ApiParam({ name: 'floorId', type: Number, description: 'Room ID' })
    @ApiResponse({ status: 200, description: 'Rooms retrieved successfully' })
    async getRoomByFloorId(@Param('floorId') floorId: number): Promise<Room[]> {
        return this.roomService.getRoomByFloorId(floorId);
    }

    // Additional endpoints can be added here
} 