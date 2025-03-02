import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './building.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Building])],
    controllers: [BuildingController],
    providers: [BuildingService],
})
export class BuildingModule {} 