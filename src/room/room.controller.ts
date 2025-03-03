import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetRoomByFloorIdDto } from './room.dto';

@Controller('room')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class RoomController extends BaseController<Room> {
    constructor(private readonly roomService: RoomService) {
        super(roomService);
    }

    @Get('floor/:floorId')
    @ApiOperation({ summary: 'Get rooms by floor id' })
    @ApiBody({ type: GetRoomByFloorIdDto })
    @ApiResponse({ status: 200, description: 'Rooms retrieved successfully' })
    async getRoomByFloorId(@Param('floorId') getRoomByFloorIdDto: GetRoomByFloorIdDto): Promise<Room[]> {
        return this.roomService.getRoomByFloorId(getRoomByFloorIdDto);
    }

    // Additional endpoints can be added here
} 