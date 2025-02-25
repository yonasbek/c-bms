import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'Item Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Item Description' })
  @IsNotEmpty()
  @IsString()
  description: string;
} 