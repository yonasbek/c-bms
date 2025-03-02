import { Module } from '@nestjs/common';
import { BuildingUserController } from './building-user.controller';
import { BuildingUserService } from './building-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingUser } from './building-user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BuildingUser])],
    controllers: [BuildingUserController],
    providers: [BuildingUserService],
})
export class BuildingUserModule {} 