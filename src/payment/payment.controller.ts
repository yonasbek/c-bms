import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('payment')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class PaymentController extends BaseController<Payment> {
    constructor(private readonly paymentService: PaymentService) {
        super(paymentService);
    }

    // Additional endpoints can be added here
} 