import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentDto {
    @IsNotEmpty()
    contractId: number; // Reference to the Contract

    @IsNotEmpty()
    reference_number: string;

    @IsNotEmpty()
    payment_status: string;

    @IsNotEmpty()
    payment_from: string;

    @IsNotEmpty()
    payment_to: string;

    @IsOptional()
    file_url?: string; // Nullable field for file URL
} 