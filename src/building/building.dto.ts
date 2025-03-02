import { IsNotEmpty } from 'class-validator';

export class CreateBuildingDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    // Add other relevant fields as necessary
} 