import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 'contract_1' })
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @ApiProperty({ example: 'Leaky faucet' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'pending' })
  @IsNotEmpty()
  @IsString()
  request_status: string;
} 

export class GetMaintenanceRequestByRoomIdDto {
    @IsNotEmpty()
    roomId: number;
}


