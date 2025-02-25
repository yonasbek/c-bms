import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ example: 'New Contract' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'contract' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: 'A new contract has been created.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'group1' })
  @IsNotEmpty()
  @IsString()
  group_type: string;

  @ApiProperty({ example: 'tenant_1' })
  @IsNotEmpty()
  @IsString()
  tenant_id: string;
} 