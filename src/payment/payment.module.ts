import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Contract } from '../contract/contract.entity'; // Import Contract entity

@Module({
    imports: [TypeOrmModule.forFeature([Payment, Contract])],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
})
export class PaymentModule {} 