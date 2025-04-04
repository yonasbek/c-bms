import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract/contract.entity';
import { Payment } from './payment/payment.entity';
import { Repository } from 'typeorm';
import { NotificationService } from './notification/notification.service';
import { NotificationType } from './notification/notification.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly notificationService: NotificationService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getContractDueDate() {
    const currentDate = new Date();
    const tenDaysFromNow = new Date(currentDate.getTime() + (10 * 24 * 60 * 60 * 1000));
    
    // Get contracts with relations
    const contracts = await this.contractRepository.find({
      relations: ['room', 'room.floor', 'room.floor.building', 'user']
    });
    
    // Handle active contracts
    for (const contract of contracts.filter(c => c.contract_status === 'active')) {
      // Check for contracts ending within 10 days
      if (contract.end_date <= tenDaysFromNow && contract.end_date > currentDate) {
        const daysUntilEnd = Math.ceil((contract.end_date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        const message = `Your contract for room ${contract.room.room_number} will end in ${daysUntilEnd} days. Please contact the management for renewal.`;
        
        await this.notificationService.createNotification({
          type: NotificationType.CONTRACT,
          message: message,
          userId: contract.userId,
          buildingId: contract.room.floor.building.id
        });
      }
      
      // Check for expired contracts
      if (contract.end_date < currentDate) {
        await this.contractRepository.update(contract.id, { contract_status: 'expired' });
        
        const message = `Your contract for room ${contract.room.room_number} has expired. Please contact the management for renewal.`;
        await this.notificationService.createNotification({
          type: NotificationType.CONTRACT,
          message: message,
          userId: contract.userId,
          buildingId: contract.room.floor.building.id
        });
      }
    }
    
    // Get payments with relations
    const payments = await this.paymentRepository.find({
      relations: ['contract', 'contract.room', 'contract.room.floor', 'contract.room.floor.building', 'contract.user']
    });
    
    // Handle active payments
    for (const payment of payments.filter(p => p.payment_status === 'active')) {
      // Check for payments due within 10 days
      if (payment.payment_to <= tenDaysFromNow && payment.payment_to > currentDate) {
        const daysUntilEnd = Math.ceil((payment.payment_to.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        const message = `Your payment for room ${payment.contract.room.room_number} is due in ${daysUntilEnd} days. Please make the payment.`;
        
        await this.notificationService.createNotification({
          type: NotificationType.PAYMENT,
          message: message,
          userId: payment.contract.userId,
          buildingId: payment.contract.room.floor.building.id
        });
      }
      
      // Check for expired payments
      if (payment.payment_to < currentDate) {
        await this.paymentRepository.update(payment.id, { payment_status: 'expired' });
        
        const message = `Your payment for room ${payment.contract.room.room_number} is overdue. Please make the payment immediately.`;
        await this.notificationService.createNotification({
          type: NotificationType.PAYMENT,
          message: message,
          userId: payment.contract.userId,
          buildingId: payment.contract.room.floor.building.id
        });
      }
    }
  }
}
