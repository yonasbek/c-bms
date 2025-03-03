import { IsNotEmpty } from 'class-validator';

export class CreateBuildingUserDto {
    @IsNotEmpty()
    buildingId: number;

    @IsNotEmpty()
    userId: number;
} 

export class GetBuildingUserByBuildingIdDto {
    @IsNotEmpty()
    buildingId: number;
}
