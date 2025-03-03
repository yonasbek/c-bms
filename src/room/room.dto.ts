import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    floorId: number; // Reference to the Floor

    @IsNotEmpty()
    userId: number; // Reference to the User
} 

export class GetRoomByFloorIdDto {
    @IsNotEmpty()
    floorId: number; // Reference to the Floor
}
