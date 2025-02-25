import { Module } from '@nestjs/common';
import { SubContractController } from './subcontract.controller';
import { SubContractService } from './subcontract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubContract } from './subcontract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubContract])],
  controllers: [SubContractController],
  providers: [SubContractService],
  exports: [SubContractService],
})
export class SubContractModule {} 