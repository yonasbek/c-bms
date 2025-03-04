import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './building.entity';
import { Contract } from '../contract/contract.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Building, Contract])],
    controllers: [BuildingController],
    providers: [BuildingService],
})
export class BuildingModule {} 