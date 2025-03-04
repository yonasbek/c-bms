import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuildingTenantDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    buildingId: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    userId: number;
} 