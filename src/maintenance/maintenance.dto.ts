import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 'contract_1' })
  @IsNotEmpty()
  @IsString()
  contract_id: string;

  @ApiProperty({ example: 'Leaky faucet' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'pending' })
  @IsNotEmpty()
  @IsString()
  request_status: string;
} 