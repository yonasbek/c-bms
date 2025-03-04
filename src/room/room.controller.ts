import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Patch, Body, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import upload from '../config/multer.config'; // Import multer config
import { UpdateRoomDto } from './room.dto';

@ApiTags('Rooms')
@Controller('room')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class RoomController extends BaseController<Room> {
    constructor(private readonly roomService: RoomService) {
        super(roomService);
    }

    @Get('floor/:floorId')
    @ApiOperation({ summary: 'Get rooms by floor id' })
    @ApiResponse({ status: 200, description: 'Rooms retrieved successfully' })
    async getRoomByFloorId(@Param('floorId') floorId: number): Promise<Room[]> {
        return this.roomService.getRoomByFloorId(floorId);
    }

    @Get('building/:buildingId')
    @ApiOperation({ summary: 'Get rooms by building id' })
    @ApiResponse({ status: 200, description: 'Rooms retrieved successfully' })
    async getRoomByBuildingId(@Param('buildingId') buildingId: number): Promise<Room[]> {
        return this.roomService.getRoomByBuildingId(buildingId);
    }

    @Patch(':roomId')
    @ApiOperation({ summary: 'Update a room by ID' })
    @ApiParam({ name: 'roomId', description: 'Room ID' })
    @ApiBody({ type: UpdateRoomDto })
    @ApiResponse({ status: 200, description: 'Room updated successfully' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    async updateRoom(
        @Param('roomId') roomId: number,
        @Body() updateRoomDto: UpdateRoomDto
    ): Promise<Room> {
        return this.roomService.updateRoom(roomId, updateRoomDto);
    }

    // Additional endpoints can be added here
} 