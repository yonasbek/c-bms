import { IsNotEmpty } from 'class-validator';

export class CreateFloorDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    buildingId: number; // Reference to the Building
} 

export class GetFloorByBuildingIdDto {
    @IsNotEmpty()
    buildingId: number; // Reference to the Building
}
