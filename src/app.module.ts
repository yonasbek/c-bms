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
    FloorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
