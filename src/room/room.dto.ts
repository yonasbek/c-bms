import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    floorId: number; // Reference to the Floor

    @IsNotEmpty()
    userId: number; // Reference to the User
}

export class UpdateRoomDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    floorId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    // Add other fields that can be updated
} 


