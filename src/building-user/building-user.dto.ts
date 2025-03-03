import { IsNotEmpty } from 'class-validator';

export class CreateBuildingUserDto {
    @IsNotEmpty()
    buildingId: number;

    @IsNotEmpty()
    userId: number;
} 


