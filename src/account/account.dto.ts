import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @IsString()
  account_type: string;

  @ApiProperty({ example: 'contract_1' })
  @IsNotEmpty()
  @IsString()
  contract_id: string;
} 