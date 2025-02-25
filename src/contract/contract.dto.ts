import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContractDto {
  @ApiProperty({ example: 'room_1' })
  @IsNotEmpty()
  @IsString()
  room_id: string;

  @ApiProperty({ example: 'tenant_1' })
  @IsNotEmpty()
  @IsString()
  tenant_id: string;

  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  payment_per_sqm: number;

  @ApiProperty({ example: 'rent' })
  @IsNotEmpty()
  @IsString()
  payment_item: string;

  @ApiProperty({ example: 'http://example.com/file.pdf' })
  @IsNotEmpty()
  @IsString()
  file_url: string;

  @ApiProperty({ example: 'active' })
  @IsNotEmpty()
  @IsString()
  status: string;
} 