import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: 'item_1' })
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: '2023-10-01' })
  @IsNotEmpty()
  @IsString()
  procured_date: Date;
} 