import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContractDocumentDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  contractId: number;

  @ApiProperty({ example: 'Lease Agreement' })
  @IsNotEmpty()
  @IsString()
  document_name: string;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  document_type?: string;

  @ApiProperty({ example: 1024 })
  @IsNumber()
  document_size?: number;
}

export class MultipleFilesDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
} 