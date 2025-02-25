import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubContractDto {
  @ApiProperty({ example: 'Company A' })
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty({ example: 6 })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 5000 })
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  number_of_employees: number;

  @ApiProperty({ example: 'http://example.com/attachment.pdf' })
  @IsNotEmpty()
  @IsString()
  attachment_url: string;
} 