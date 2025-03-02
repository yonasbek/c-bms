import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './payment.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class PaymentService extends BaseService<Payment> {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
    ) {
        super(paymentRepository);
    }


    // Additional methods can be added here
} 