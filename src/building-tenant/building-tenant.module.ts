import { Module } from '@nestjs/common';
import { BuildingTenantController } from './building-tenant.controller';
import { BuildingTenantService } from './building-tenant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingTenant } from './building-tenant.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BuildingTenant])],
    controllers: [BuildingTenantController],
    providers: [BuildingTenantService],
})
export class BuildingTenantModule {} 