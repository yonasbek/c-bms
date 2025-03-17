import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBulkNotificationDto {
  @ApiProperty({ example: 'New Contract' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ example: 'sms, push' })
  @IsNotEmpty()
  @IsString()
  type: string;


  @ApiProperty({ example: 'bulk' })
  @IsNotEmpty()
  @IsString()
  group_type: string;

  @ApiProperty({ example: 'tenant_1' })
  @IsString()
  tenant_ids?: number [];


} 

export class CreateSingleNotificationDto {
  @ApiProperty({ example: 'New Contract' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ example: 'sms, push' })
  @IsNotEmpty()
  @IsString()
  type: string;


  @ApiProperty({ example: 'single' })
  @IsNotEmpty()
  @IsString()
  group_type: string;

  @ApiProperty({ example: 'tenant_1' })
  tenant_id?: number;


} 