import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ContractModule } from './contract/contract.module';
import { SubContractModule } from './subcontract/subcontract.module';
import { NotificationModule } from './notification/notification.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { AccountModule } from './account/account.module';
import { InventoryModule } from './inventory/inventory.module';
import { BuildingModule } from './building/building.module';
import { BuildingUserModule } from './building-user/building-user.module';
import { PaymentModule } from './payment/payment.module';
import { RoomModule } from './room/room.module';
import { FloorModule } from './floor/floor.module';
import { BuildingTenantModule } from './building-tenant/building-tenant.module';
import { PaymentService } from './payment/payment.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { Contract } from './contract/contract.entity';
import { Payment } from './payment/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractDocumentModule } from './contract-document/contract-document.module';
import { ReportModule } from './report/report.module';
@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ContractModule,
    SubContractModule,
    NotificationModule,
    MaintenanceModule,
    AccountModule,
    InventoryModule,
    BuildingModule,
    BuildingUserModule,
    PaymentModule,
    RoomModule,
    FloorModule,
    BuildingTenantModule,
    ContractDocumentModule,
    ReportModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Contract, Payment]),
    
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
  exports: [AppService]
})
export class AppModule {}
